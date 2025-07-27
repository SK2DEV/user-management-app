import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { confirm } = Modal;

export const showDeleteConfirm = (onConfirm) => {
  confirm({
    title: "Are you sure you want to delete this user?",
    icon: <ExclamationCircleOutlined />,
    content: "This action cannot be undone.",
    okText: "Yes",
    okType: "danger",
    cancelText: "No",
    onOk() {
      if (typeof onConfirm === "function") {
        onConfirm(); // Execute the delete function
      }
    },
  });
};
