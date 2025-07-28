import { Layout, Card } from "antd";
import AppHeader from "./app-header";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/slices/auth-slice";
import { useEffect, useState } from "react";

const { Content } = Layout;

const PageLayout = ({ title, filter, action, pagination, children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 576);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 576);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#f5f6fa" }}>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 1000,
          background: "#fff",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <AppHeader username="Elon Musk" onLogout={handleLogout} />
      </div>

      <Layout style={{ padding: "16px", marginTop: "64px" }}>
        <Content>
          <Card
            title={title}
            extra={
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "8px",
                  flexWrap: "nowrap",
                  overflow: "hidden",
                }}
              >
                {filter && <div style={{ flex: 1, minWidth: 0 }}>{filter}</div>}
                {action && action}
              </div>
            }
            style={{
              marginTop: isMobile ? "10px" : "0",
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
            }}
          >
            {children}
          </Card>

          {pagination && (
            <div
              style={{
                marginTop: "16px",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              {pagination}
            </div>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default PageLayout;
