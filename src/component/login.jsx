
import { Button, Checkbox, Form, Input, Layout, Card, Alert } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { loginUser } from "../store/slices/auth-slice";
import { useEffect } from "react";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, status, error } = useSelector((state) => state.auth);

 
  const onFinish = (values) => {
    const { remember, ...credentials } = values;
    dispatch(loginUser({ credentials, remember }));
  };
  useEffect(() => {
    if (token) {
      navigate("/users");
    }
  }, [token, navigate]);

  return (
    <Layout className="login-container">
      <Card className="login-card">
        {status === "failed" && (
          <Alert message={error || "Incorrect email and password"} type="error" showIcon style={{ marginBottom: 16 }} />
        )}
        <Form
          name="login"
          onFinish={onFinish}
          initialValues={{ remember: true }}
          layout="vertical"
        >
          <Form.Item
            name="email"
            className="login-item"
            rules={[
              { type: "email", message: "Invalid email!" },
              { required: true, message: "Please input your E-mail!" },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            className="login-item"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>

          <Form.Item className="login-item">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item className="login-item">
            <Button type="primary" htmlType="submit" block loading={status === "loading"}>
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Layout>
  );
};

export default Login;

