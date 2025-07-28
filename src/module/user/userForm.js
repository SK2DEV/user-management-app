import React, { useEffect } from "react";
import { Form, Input, Button } from "antd";
import Popups from "../../utils/popups";

const UserForm = ({ form, visible, onCancel, onSubmit, saving, editingUser }) => {

  useEffect(() => {
    if (visible) {
      if (editingUser) {
        form.setFieldsValue({
          firstName: editingUser.first_name || "",
          lastName: editingUser.last_name || "",
          email: editingUser.email || "",
          profileImage: editingUser.avatar || "",
        });
      } else {
        form.resetFields();
      }
    }
  }, [visible, editingUser, form]);

  const handleFinish = (values) => {
    const userData = {
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      avatar: values.profileImage,
    };
    if (editingUser && editingUser.id) {
      userData.id = editingUser.id;
    }
    onSubmit(userData);
  };

  return (
    <Popups title={editingUser ? "Edit User" : "Create New User"} open={visible} onCancel={onCancel} width={500}>
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[{ required: true, message: "Please enter first name" }]}
        >
          <Input placeholder="Please enter first name" />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[{ required: true, message: "Please enter last name" }]}
        >
          <Input placeholder="Please enter last name" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter email" },
            { type: "email", message: "Please enter a valid email" },          ]}
        >
          <Input placeholder="Please enter email" />
        </Form.Item>

        <Form.Item
          label="Profile Image Link"
          name="profileImage"
          rules={[{ required: true, message: "Please enter profile image link" }]}
        >
          <Input placeholder="Please enter profile image link" />
        </Form.Item>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={onCancel} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" loading={saving}>
            {editingUser ? "Update" : "Submit"}
          </Button>
        </div>
      </Form>
    </Popups>
  );
};

export default UserForm;
