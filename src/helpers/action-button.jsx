import React from "react";
import { Modal, Tooltip, Space, Button } from "antd";
import {
  ExclamationCircleOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

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
      danger: false,
      onClick: () => onEdit(record),
    },
    {
      key: "delete",
      icon: <DeleteOutlined />,
      label: "Delete",
      danger: true,
      onClick: showDeleteConfirm,
    },
  ];

  const isCardMode = mode === "card";

  return (
    <Space>
      {actions.map(({ key, icon, label, onClick, danger }) => {
        const button = (
          <Button
            key={key}
            type= "primary"
            danger={danger}
            shape={isCardMode ? "circle" : "default"}
            icon={isCardMode ? icon : null}
            onClick={onClick}
            size={isCardMode ? "large" : "middle"}
          >
            {!isCardMode && label}
          </Button>
        );

        return isCardMode ? (
          <Tooltip title={label} key={key}>
            {button}
          </Tooltip>
        ) : (
          button
        );
      })}
    </Space>
  );
};

export default ActionButtons;
