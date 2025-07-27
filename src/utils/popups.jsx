import { Modal } from "antd";

const Popups = ({ title, open, onCancel, children, ...rest }) => {
  return (
    <Modal
      title={title}
      open={open}
      onCancel={onCancel}
      maskClosable={false}
      
      footer={null}
      {...rest}
    >
      {children}
    </Modal>
  );
};

export default Popups;
