import React, { useState } from "react";
import { Alert } from "reactstrap";

const PageAlert = (props) => {
  const [visible, setVisible] = useState(true);

  const onDismiss = () => setVisible(false);

  return (
    <Alert color={props.color} isOpen={visible} toggle={onDismiss}>
      <h4 className="alert-heading">{props.text}</h4>
      <p>{props.info}</p>
    </Alert>
  );
};

export default PageAlert;
