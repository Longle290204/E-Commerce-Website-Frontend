import { TreeSelect } from "antd";
import React, { useState } from "react";

function TreeCategory() {
  const [value, setValue] = useState();
  const onChange = (newValue) => {
    console.log(newValue);
    setValue(newValue);
  };
  return (
    <TreeSelect
      showSearch
      style={{
        width: "100%",
      }}
      value={value}
      dropdownStyle={{
        maxHeight: 400,
        overflow: "auto",
      }}
      placeholder="Please select"
      allowClear
      multiple
      treeDefaultExpandAll
      onChange={onChange}
      // treeData={treeData}
    />
  );
}

export default TreeCategory;
