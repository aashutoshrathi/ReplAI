import * as React from "react";
import PropTypes from "prop-types";
import { ChoiceGroup, DefaultButton, PrimaryButton, Stack } from "@fluentui/react";
import Progress from "./Progress";
// images references in the manifest
import "../../../assets/icon-16.png";
import "../../../assets/icon-32.png";
import "../../../assets/icon-80.png";
/* global Office, require */
const size = 42;
const logo = require("./../../../assets/logo-filled.png");
const App = (props) => {
  const { title, isOfficeInitialized } = props;

  const [content, setContent] = React.useState();
  const [isLoading, setIsLoading] = React.useState(true);
  const [options, setOptions] = React.useState([]);
  const [selected, setSelected] = React.useState("0");

  React.useEffect(() => {
    Office.context.mailbox.item.body.getAsync(
      "text",
      { asyncContext: "This is passed to the callback" },
      function callback(result) {
        setContent(result.value);
      }
    );
  }, []);

  React.useEffect(() => {
    setIsLoading(true);
    if (content) {
      setOptions([
        { key: "0", text: content?.toLowerCase().slice(0, 30) },
        { key: "1", text: content?.toUpperCase().slice(0, 30) },
        { key: "2", text: content?.slice(0, 30) },
      ]);
    }
    setIsLoading(false);
  }, [content]);

  const refreshReplies = async () => {};

  const reply = () => {
    Office.context.mailbox.item.displayReplyForm(options.find((o) => o.key === selected)?.text);
  };

  if (!isOfficeInitialized || isLoading) {
    return <Progress title={title} logo={logo} message="Please sideload your addin to see app body." />;
  }

  return (
    <div>
      <Stack
        horizontal
        tokens={{
          childrenGap: "5%",
          padding: "s1 5%",
        }}
      >
        <img width={size} height={size} src={logo} alt={title} title={title} />
        <h3>ReplAI</h3>
      </Stack>
      <br />
      {content && (
        <>
          <ChoiceGroup
            selectedKey={selected}
            options={options}
            onChange={(_e, o) => setSelected(o.key)}
            label="We have generated few reply suggestions, Select the most suitable one"
            required={true}
          />
          <br />
        </>
      )}
      <Stack
        horizontal
        tokens={{
          childrenGap: "4%",
          padding: "s1 4%",
        }}
      >
        <PrimaryButton onClick={reply} iconProps={{ iconName: "reply" }}>
          Reply
        </PrimaryButton>
        <DefaultButton onClick={refreshReplies} iconProps={{ iconName: "refresh" }}>
          Reset Replies
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
