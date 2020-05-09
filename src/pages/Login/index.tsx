import React, { FC } from "react";
import { useLocalStore, useObserver } from "mobx-react-lite";
import styles from "./index.module.scss";
import { Form, Input, Checkbox, Button } from "antd";
import { RouteComponentProps } from "react-router-dom";
import { hot } from "react-hot-loader/root";

const Login: FC<RouteComponentProps> = ({ history }) => {
  const store = useLocalStore(() => ({
    onFinish: (values: any) => {
      console.log("Success:", values);
      sessionStorage.setItem("userName", values.username);
      history.push("/user");
    },
  }));
  const tailLayout = {
    wrapperCol: { offset: 4, span: 16 },
  };
  return useObserver(() => (
    <div className={styles.loginPage}>
      <div className={styles.formWrapper}>
        <header className={styles.header}>
          <span className={styles.title}>标注平台</span>
        </header>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={store.onFinish}
        >
          <Form.Item
            label="账户"
            name="username"
            rules={[{ required: true, message: "请输入账户!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: "请输入密码!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout} name="remember" valuePropName="checked">
            <Checkbox>记住密码</Checkbox>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  ));
};
export default hot(Login);
