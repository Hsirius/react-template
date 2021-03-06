import React, { useEffect } from "react";
import { useLocalStore, useObserver } from "mobx-react-lite";
import styles from "./index.module.scss";
import { Select, Dropdown, Menu } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { withRouter } from "react-router-dom";
import useRootStore from "../models";
import { roleList } from "../pages/User/user";

const { Option } = Select;

const Header = withRouter(({ history }) => {
  const rootStore = useRootStore();
  const store = useLocalStore(() => ({
    handleChange: (value: any) => {
      console.log(`selected ${value}`);
    },
  }));
  const userDropDown = (
    <Menu>
      <Menu.Item
        key="logout"
        onClick={() => {
          history.push("/login");
          sessionStorage.removeItem("userName");
          sessionStorage.removeItem("role");
        }}
      >
        <LogoutOutlined />
        <span>退出登录</span>
      </Menu.Item>
    </Menu>
  );
  useEffect(() => {
    rootStore.global.fetchCurrentRole();
  }, [rootStore.global]);
  return useObserver(() => (
    <header className={styles.header}>
      <h1>赛博智能标注平台</h1>
      <div className={styles.user_box}>
        {rootStore.global.currentRole ? (
          <Select
            defaultValue={rootStore.global.currentRole}
            style={{ width: 120 }}
            onChange={store.handleChange}
          >
            {roleList.map((item) => (
              <Option key={item.value} value={item.value}>
                {item.value}
              </Option>
            ))}
          </Select>
        ) : null}
        <Dropdown overlay={userDropDown}>
          <span className={styles.user}>{rootStore.global.currentUser}</span>
        </Dropdown>
      </div>
    </header>
  ));
});
export default Header;
