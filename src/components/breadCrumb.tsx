import { Breadcrumb } from "antd";
import { useObserver } from "mobx-react-lite";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import useRootStore from "../models";
import styles from "./index.module.scss";

interface BreadcrumbProps {
  title: string;
}

const BreadCrumb: FC<BreadcrumbProps> = ({ title }) => {
  const rootStore = useRootStore();
  return useObserver(() => (
    <div className={styles.page_header}>
      <Breadcrumb>
        {rootStore.global.breadCrumb?.map((item) => (
          <Breadcrumb.Item key={item.name}>
            <Link to={item.path}>{item.name}</Link>
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
      <p className={styles.title}>{title}</p>
    </div>
  ));
};

export default BreadCrumb;
