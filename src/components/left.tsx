import React, { useEffect } from "react";
import { useLocalStore, useObserver } from "mobx-react-lite";
import styles from "./index.module.scss";
import { Link, withRouter } from "react-router-dom";

const Left = withRouter(({ history }) => {
  const store = useLocalStore(() => ({
    activePath: "",
    data: [
      { key: "aboutInfo", name: "标注团队", path: "/" },
      { key: "about", name: "项目中心", path: "/about" },
    ],
  }));
  useEffect(() => {
    store.activePath = `/${history.location.pathname.split("/")[1]}`;
  }, [history.location.pathname]);
  return useObserver(() => (
    <aside className={styles.left}>
      <ul>
        {store.data.map((item) => (
          <li
            className={store.activePath === item.path ? styles.active : ""}
            key={item.key}
          >
            <Link to={item.path}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </aside>
  ));
});
export default Left;
