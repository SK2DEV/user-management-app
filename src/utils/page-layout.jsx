import { Layout, Card, Row, Col } from "antd";
import AppHeader from "./app-header";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/slices/auth-slice";

const { Content } = Layout;

const  PageLayout = ({ title, action, filter, hideFilter, children })=> {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  return (
    <Layout style={{ minHeight: "100vh",backgroundColor: "#f5f6fa"  }}>
    <AppHeader username="Satheesh Kumar" onLogout={handleLogout} />

      
    <Layout style={{ padding: "16px" }}>
      <Content>
        <Card
          title={!hideFilter && title}
          extra={
            <Row gutter={8} align="middle">
              {filter && (
                <Col>
                  {filter} 
                </Col>
              )}
              {action && (
                <Col>
                  {action} 
                </Col>
              )}
            </Row>
          }
        >
          {children}
        </Card>
      </Content>
    </Layout>
    </Layout>
  );
}

export default PageLayout;
