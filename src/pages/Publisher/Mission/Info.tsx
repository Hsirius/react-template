import { useObserver } from "mobx-react-lite";
import React, { FC } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Card } from "antd";

const ListInfo: FC<RouteComponentProps<{ id: string }>> = ({
  history,
  match: {
    params: { id },
  },
}) => {
  return useObserver(() => <Card>{id}</Card>);
};
export default ListInfo;
