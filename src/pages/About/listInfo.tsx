import { useObserver, useLocalStore } from "mobx-react-lite";
import React, { FC, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { getBossReleaseNews } from "../../service/test/test";

const ListInfo: FC<RouteComponentProps<{ listId: string }>> = ({
  history,
  match: {
    params: { listId },
  },
}) => {
  const store = useLocalStore(() => ({
    getBossReleaseNewss: () => {
      getBossReleaseNews().then((res) => {
        console.log(res);
      });
    },
  }));
  useEffect(() => {
    store.getBossReleaseNewss();
  }, []);
  return useObserver(() => <div>{listId}</div>);
};
export default ListInfo;
