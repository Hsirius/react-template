import { Menu } from "antd";
import { useLocalStore, useObserver } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { menu } from "../menu";
import useRootStore from "../models";

export let breadcrumbItems = [];

const Left = withRouter(({ history }) => {
  const store = useLocalStore(() => ({
    activePath: "" || undefined,
    getExtraBreadcrumbItems: (curPath: string) => {
      const pathSnippets = curPath.split("/").filter((i) => i);
      return pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
        return url;
      });
    },
  }));
  const rootStore = useRootStore();
  useEffect(() => {
    store.activePath = rootStore.global.matchPath(
      history.location.pathname,
      menu
    );
    const extraBreadcrumbItems = store.getExtraBreadcrumbItems(
      history.location.pathname
    );
    //生成面包屑
    rootStore.global.breadCrumb = [];
    rootStore.global.fetchBreadCrumb(extraBreadcrumbItems, menu);
  }, [history.location.pathname, rootStore.global, store]);
  return useObserver(() => (
    <Menu style={{ width: 256 }} selectedKeys={[store.activePath || ""]}>
      {menu.map((item) =>
        item.navFlag ? (
          <Menu.Item key={item.path}>
            <Link to={item.path}>{item.name}</Link>
          </Menu.Item>
        ) : null
      )}
    </Menu>
  ));
});
export default Left;
