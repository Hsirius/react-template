import React from "react";
import { useLocalStore, useObserver } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Radio } from "antd";
import { RadioChangeEvent } from "antd/lib/radio";

export const roleList = [
  { key: "releaser", value: "发布员" },
  { key: "annotator", value: "标注员" },
  { key: "auditor", value: "审核员" },
];

const User = () => {
  const store = useLocalStore(() => ({
    value: "",
    onChange: (e: RadioChangeEvent) => {
      store.value = e.target.value;
      sessionStorage.setItem("role", e.target.value);
    },
  }));
  return useObserver(() => (
    <div>
      <Radio.Group onChange={store.onChange}>
        {roleList.map((item) => (
          <Radio key={item.key} value={item.key}>
            {item.value}
          </Radio>
        ))}
      </Radio.Group>
      <Link to={"/"}>to home</Link>
    </div>
  ));
};
export default User;
