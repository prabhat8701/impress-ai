import React from "react";
import { Table, Button } from "antd";

const SimpleTable = ({ dataSource }) => {
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <span>
          <Button type="primary" style={{ marginRight: 8 }}>Edit</Button>
          <Button type="danger">Delete</Button>
        </span>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      rowKey="id"
      pagination={false}
      bordered
      style={{ marginTop: 16 }}
      size="small"
    />
  );
};

export default SimpleTable;