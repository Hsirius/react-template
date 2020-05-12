import { Radio } from "antd";
import { RadioChangeEvent } from "antd/lib/radio";
import { useLocalStore, useObserver } from "mobx-react-lite";
import React, { FC } from "react";
import { RouteComponentProps } from "react-router-dom";

export const roleList = [
  { key: "releaser", value: "发布员" },
  { key: "annotator", value: "标注员" },
  { key: "auditor", value: "审核员" },
];

const User: FC<RouteComponentProps> = ({ history }) => {
  const store = useLocalStore(() => ({
    value: "",
    onChange: (e: RadioChangeEvent) => {
      store.value = e.target.value;
    },
    toMisssion: () => {
      sessionStorage.setItem("role", store.value);
      history.push("/mission");
    },
  }));
  return useObserver(() => (
    <div>
      <Radio.Group onChange={store.onChange}>
        {roleList.map((item) => (
          <Radio key={item.key} value={item.value}>
            {item.value}
          </Radio>
        ))}
      </Radio.Group>
      {store.value ? <a onClick={store.toMisssion}>to mission</a> : null}
    </div>
  ));
};
export default User;
