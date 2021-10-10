import * as React from "react";
import PropTypes from "prop-types";
import { DefaultButton } from "@fluentui/react";
import Progress from "./Progress";
// images references in the manifest
import "../../../assets/icon-16.png";
import "../../../assets/icon-32.png";
import "../../../assets/icon-80.png";
/* global Office, require */

const App = (props) => {
  const { title, isOfficeInitialized } = props;

  const [content, setContent] = React.useState();

  const click = async () => {
    Office.context.mailbox.item.body.getAsync(
      "text",
      { asyncContext: "This is passed to the callback" },
      function callback(result) {
        setContent(result.value);
      }
    );
  };

  if (!isOfficeInitialized) {
    return (
      <Progress
        title={title}
        logo={require("./../../../assets/logo-filled.png")}
        message="Please sideload your addin to see app body."
      />
    );
  }

  return (
    <div className="ms-welcome">
      <p className="ms-font-l">Subject: {Office.context.mailbox.item.subject}</p>
      {content && <p className="ms-font-l">Content: {content}</p>}
      <DefaultButton className="ms-welcome__action" onClick={click}>
        See Content
      </DefaultButton>
    </div>
  );
};

App.propTypes = {
  title: PropTypes.string,
  isOfficeInitialized: PropTypes.bool,
};

export default App;
