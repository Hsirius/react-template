import React, { ComponentType, Suspense } from "react";
//这里加root路径，不然报错
import { hot } from "react-hot-loader/root";
import { Redirect, Route, RouteComponentProps, Switch } from "react-router-dom";
import styles from "./App.module.scss";
import BreadCrumb from "./components/breadCrumb";
import Header from "./components/header";
import Left from "./components/left";

export const menu: ProMenuType[] = [];

//@ts-ignore
const context = require.context("./pages", true, /\.\/[^/]+\/index\.ts?$/);

export interface ProMenuType {
  // 页面组件懒加载
  // component?: LazyExoticComponent<any>;
  component?:
    | React.LazyExoticComponent<() => JSX.Element>
    | React.ComponentType<RouteComponentProps>
    | React.LazyExoticComponent<React.FC<RouteComponentProps<any>>>;
  //菜单跳转路径，如果未设置routePath，则同时也是路由路径
  path: string;
  //路由路径，当路径包含变量时使用
  routePath?: string;
  //菜单项名称，影响页面标题和面包屑
  name: string;
  //菜单图标，ant design icon组件
  icon?: string;
  //子菜单
  routes?: ProMenuType[];
  //路径是否精确匹配
  exact?: boolean;
  //是否在菜单中隐藏该项
  hideInMenu?: boolean;
  //是否在面包屑中隐藏
  hideInBreadcrumb?: boolean;
  //是否在侧边导航栏显示
  navFlag?: boolean;
}

context.keys().forEach((item: string) => {
  try {
    const menuItem = context(item).default;
    // if (item === "./Home/index.ts") menu.unshift(menuItem);
    if (menuItem instanceof Array) {
      menu.push(...menuItem);
    } else {
      menu.push(menuItem);
    }
  } catch (err) {
    console.log(err);
  }
});

const processMenuItem = (menuItem: ProMenuType) => {
  let Component: ComponentType<RouteComponentProps> = ({ children }) => (
    <>{children}</>
  );
  if (menuItem.component) {
    Component = menuItem.component;
  }
  //如果用antd-pro，在有二级导航时一级导航没有对应的组件，
  //所以每个模块的index.ts的根路由没有component组件，
  //这里再加上redirect重定向到第一个子组件即可

  //不用antd-pro，把redirect删除，对应的根路由加上具体component即可
  const children = menuItem.routes ? (
    <Switch>
      {menuItem.routes.map(processMenuItem)}
      <Redirect to={menuItem.routes[0].path} />
    </Switch>
  ) : undefined;
  return menuItem.routes ? (
    <Route
      path={menuItem.routePath || menuItem.path}
      key={menuItem.routePath || menuItem.path}
      render={(props) => (
        <Suspense fallback={null}>
          <Component {...props}>{children}</Component>
        </Suspense>
      )}
      exact={menuItem.exact}
    />
  ) : (
    <Route
      path={menuItem.routePath || menuItem.path}
      key={menuItem.routePath || menuItem.path}
      render={(props) => (
        <div className={styles.box}>
          <Header />
          <div className={styles.content_box}>
            {menuItem.hideInMenu ? null : <Left />}
            <div className={styles.right_content}>
              {menuItem.hideInBreadcrumb ? null : (
                <BreadCrumb title={menuItem.name} />
              )}
              <div className={styles.content}>
                <Suspense fallback={null}>
                  <Component {...props}>{children}</Component>
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      )}
      exact={menuItem.exact}
    />
  );
};

export type ProMenuExport = ProMenuType | ProMenuType[];

export const Routes = hot(() => {
  return <Switch>{menu.map(processMenuItem)}</Switch>;
});
export default menu;
