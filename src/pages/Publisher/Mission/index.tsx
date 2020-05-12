import React, { useEffect, FC } from "react";
import { Input, Table, Divider, Popconfirm, message, Card } from "antd";
import { useObserver, useLocalStore } from "mobx-react-lite";
import styles from "./index.module.scss";
import { RouteComponentProps } from "react-router-dom";

const { Search } = Input;

interface DataType {
  id: number;
  name: string;
  type: string;
  status: number;
  process: string;
  time: string;
}

const Mission: FC<RouteComponentProps> = ({ history }) => {
  const store = useLocalStore(() => ({
    dataSource: [] as DataType[],
    initData: () => {
      let data = [] as DataType[];
      for (let i = 0; i < 5; i++) {
        data.push({
          id: i,
          name: "飞机检测测试",
          type: "飞机检测",
          status: i,
          process: "10",
          time: "2020-5-9",
        });
      }
      store.dataSource = data;
    },
    toInfo: (id: number) => {
      history.push(`/mission/list/${id}`);
    },
    deleteTask: (id: number) => {
      message.success(`成功删除id${id}`);
    },
  }));
  useEffect(() => {
    store.initData();
  }, [store]);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "名称",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: DataType) => (
        <a onClick={() => store.toInfo(record.id)}>{text}</a>
      ),
    },
    {
      title: "类型",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "进度",
      dataIndex: "process",
      key: "process",
      render: (process: string) => <span>{process}/100</span>,
    },
    {
      title: "操作",
      key: "actions",
      render: (text: string, record: DataType) => (
        <>
          <Popconfirm
            title="确定删除?"
            onConfirm={() => store.deleteTask(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <a>删除</a>
          </Popconfirm>
          <Divider type="vertical" />
          <a
            style={
              record.id === 0
                ? {
                    color: "rgba(0, 0, 0, 0.25)",
                    cursor: "notAllowed",
                    pointerEvents: "none",
                  }
                : undefined
            }
          >
            生成结果数据集
          </a>
        </>
      ),
    },
  ];
  return useObserver(() => (
    <Card>
      <div className={styles.search}>
        <Search
          placeholder="请输入项目名称或ID"
          onSearch={(value) => console.log(value)}
          size="large"
          enterButton
        />
      </div>
      <Table rowKey="id" dataSource={store.dataSource} columns={columns} />;
    </Card>
  ));
};

export default Mission;
