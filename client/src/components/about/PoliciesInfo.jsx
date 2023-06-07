import React from "react";

import { Collapse } from "antd";

const { Panel } = Collapse;

const text = `
  This is a text sample, I am too lazy to write
`;

function PoliciesInfo() {
  const onChange = (key) => {
    console.log(key);
  };
  return (
    <Collapse defaultActiveKey={["1"]} onChange={onChange}>
      <Panel header="Return Policy" key="1">
        <p>{text}</p>
      </Panel>
      <Panel header="Privacy Policy" key="2">
        <p>{text}</p>
      </Panel>
      <Panel header="This is panel header 3" key="3">
        <p>{text}</p>
      </Panel>
    </Collapse>
  );
}

export default PoliciesInfo;
