import { Table, Avatar, Dropdown, Menu, Button } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import ActionButtons from "../../helpers/action-button";
import { useEffect, useState } from "react";

const UserTable = ({ users, loading, onEdit, onDelete }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 576);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 576);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const columns = [
    {
      dataIndex: "avatar",
      key: "avatar",
      align: "center",
      render: (url) => <Avatar src={url}  size={40}/>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "left",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "First Name",
      dataIndex: "first_name",
      key: "first_name",
      align: "left",
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      key: "last_name",
      align: "left",
    },
    {
      title: "Action",
      key: "action",
      align: "left",
      render: (_, record) =>
       (
          <ActionButtons
            record={record}
            mode="table"
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ),
    },
  ];

  return (
    <div style={{ overflowX: "auto" }}>
      <Table
        columns={columns}
        dataSource={users}
        loading={loading}
        rowKey="id"
        size="small"
        pagination={false}
        scroll={{ x: "max-content" }}
      />
    </div>
  );
};

export default UserTable;
