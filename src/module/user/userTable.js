import { Table, Avatar } from "antd";
import ActionButtons from "../../helpers/action-button";

const UserTable = ({ users, loading,onEdit,onDelete }) => {
  const columns = [
    {
      dataIndex: "avatar",
      key: "avatar",
      align:"center",
      width: 250,
      render: (url) => <Avatar src={url} />,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",

      align:"left",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "First Name",
      dataIndex: "first_name",
      key: "first_name",
      align:"left",
     

    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      key: "last_name",
      align:"left",
     

    },
    {
      title: "Action",
      key: "action",
      align:"left",

      render: (_, record) =>
    (

          <ActionButtons
  record={record}
  mode="list"
  onEdit={onEdit }

  onDelete={onDelete} 
/>
        
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={users}
      loading={loading}
      rowKey="id"
      size="small"
      pagination={{ pageSize: 5 }}
    />
  );
};

export default UserTable;
