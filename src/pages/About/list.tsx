import React, { useEffect, FC } from "react";
import { useLocalStore, useObserver } from "mobx-react-lite";
import { getData } from "../../service/test/test";
import { RouteComponentProps } from "react-router-dom";

const List: FC<RouteComponentProps> = ({ history }) => {
  const store = useLocalStore(() => ({
    data: [1, 2, 3, 4, 5],
    initData: () => {
      const params = { id: 1 };
      getData(params).then((res) => {
        console.log(res);
      });
    },
    toListInfo: (data: number) => {
      history.push(`/about/list/${data}`);
    },
  }));
  useEffect(() => {
    store.initData();
  });
  return useObserver(() => (
    <ul>
      {store.data.map((item) => (
        <li key={item} onClick={() => store.toListInfo(item)}>
          {item}
        </li>
      ))}
    </ul>
  ));
};
export default List;
