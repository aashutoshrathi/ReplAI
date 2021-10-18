import * as React from "react";
import PropTypes from "prop-types";
import { ChoiceGroup, DefaultButton, PrimaryButton, Stack } from "@fluentui/react";
import Progress from "./Progress";
import ShimmerOption from "./ShimmerOption";
import { networkCall, getBody } from "../helper";
// images references in the manifest
import "../../../assets/icon-16.png";
import "../../../assets/icon-32.png";
import "../../../assets/icon-80.png";
/* global Office, require */
const size = 42;
const engine = "davinci-instruct-beta";
const logo = require("./../../../assets/logo-filled.png");

const App = (props) => {
  const { title, isOfficeInitialized } = props;

  const [content, setContent] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);
  const [options, setOptions] = React.useState([]);
  const [apiData, setApiData] = React.useState([]);

  const [refreshCount, setRefreshCount] = React.useState(1);
  const [refreshing, setRefreshing] = React.useState(true);
  const [selected, setSelected] = React.useState(0);

  React.useEffect(() => {
    setRefreshing(true);

    if (!content.length) {
      Office.context.mailbox.item.body.getAsync(
        "text",
        { asyncContext: "This is passed to the callback" },
        function callback(result) {
          setContent(result.value);
        }
      );
    }

    if (content.length) {
      networkCall(
        "POST",
        `https://api.openai.com/v1/engines/${engine}/completions`,
        JSON.stringify(getBody(content)),
        (d) => {
          setApiData(JSON.parse(d).choices);
          setIsLoading(false);
        }
      );
    }
  }, [refreshCount, content]);

  React.useEffect(() => {
    setOptions(apiData.map((c) => ({ key: c.index, text: c.text })));
    setRefreshing(false);
  }, [apiData]);

  const refreshReplies = () => setRefreshCount(refreshCount + 1);

  const reply = () => {
    Office.context.mailbox.item.displayReplyForm(options.find((o) => o.key === selected)?.text);
  };

  if (!isOfficeInitialized || isLoading) {
    return <Progress title={title} logo={logo} message={`ReplAI is thinking...`} />;
  }

  return (
    <div>
      <Stack
        className="center"
        horizontal
        tokens={{
          childrenGap: "5%",
          padding: "s1 5%",
        }}
      >
        <img width={size} height={size} src={logo} alt={title} title={title} />
        <h3>ReplAI</h3>
      </Stack>
      {refreshing && (
        <>
          <p>
            <b>We are refreshing suggestions for you!</b>
          </p>
          <br />
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <>
                <ShimmerOption key={i} />
                <br />
              </>
            ))}
        </>
      )}
      {!refreshing && content && (
        <>
          <ChoiceGroup
            defaultSelectedKey={selected}
            selectedKey={selected}
            options={options}
            onChange={(_e, o) => setSelected(o.key)}
            label="We have generated few reply suggestions, Select the most suitable one"
            required={true}
          />
        </>
      )}
      <br />
      <Stack
        horizontal
        tokens={{
          childrenGap: "4%",
          padding: "s1 4%",
        }}
      >
        <PrimaryButton disabled={refreshing} onClick={reply} iconProps={{ iconName: "reply" }}>
          Reply
        </PrimaryButton>
        <DefaultButton disabled={refreshing} onClick={refreshReplies} iconProps={{ iconName: "refresh" }}>
          {refreshing ? "Refreshing.." : "Reset Replies"}
        </DefaultButton>
      </Stack>
    </div>
  );
};

App.propTypes = {
  title: PropTypes.string,
  isOfficeInitialized: PropTypes.bool,
};

export default App;
