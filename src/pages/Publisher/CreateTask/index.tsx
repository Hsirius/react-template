import { Card } from "antd";
import { useObserver } from "mobx-react-lite";
import React from "react";

const NewTask = () => {
  return useObserver(() => <Card>创建新的任务</Card>);
};
export default NewTask;
