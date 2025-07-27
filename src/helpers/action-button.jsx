import React from "react";
import { Modal, Tooltip, Space, Button } from "antd";
import { ExclamationCircleOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

const { confirm } = Modal;

const ActionButtons = ({ record, onEdit, onDelete, mode }) => {
  const showDeleteConfirm = () =>
    confirm({
      title: `Are you sure you want to delete ${record.first_name} ${record.last_name}?`,
      icon: <ExclamationCircleOutlined />,
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => onDelete(record.id),
    });

  const actions = [
    {
      key: "edit",
      icon: <EditOutlined />,
      label: "Edit",
      color: "#1890ff",
      onClick: () => onEdit(record),
    },
    {
      key: "delete",
      icon: <DeleteOutlined />,
      label: "Delete",
      color: "#ff4d4f",
      onClick: showDeleteConfirm,
      danger: true,
    },
  ];

  return (
    <Space>
      {actions.map(({ key, icon, label, onClick, danger }) =>
        mode === "card" ? (
          <Tooltip title={label} key={key}>
            <div
              role="button"
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#f0f0f0",
                color: danger ? "#ff4d4f" : "#1890ff",
                cursor: "pointer",
                transition: "0.3s",
              }}
              onClick={onClick}
            >
              {icon}
            </div>
          </Tooltip>
        ) : (
          <Button
            key={key}
            type="primary"
            danger={danger}
            // icon={icon}
            onClick={onClick}
          >
            {label}
          </Button>
        )
      )}
    </Space>
  );
};

export default ActionButtons;
