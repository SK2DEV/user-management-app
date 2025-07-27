import React from "react";
import { Layout, Avatar } from "antd";
import { AiOutlineLogout } from "react-icons/ai";

const { Header } = Layout;

const AppHeader = ({ username = "John Doe", onLogout }) => {
  return (
    <Header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px",
        background: "#001529",
        color: "#fff",
      }}
    >
      <div style={{ fontSize: "18px", fontWeight: "bold" }}>Mallow User App</div>

      <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
        <span style={{ color: "#fff", marginRight: "12px" }}>{username}</span>
        <Avatar
          style={{ backgroundColor: "#ff4d4f" }} // Red background
          icon={<AiOutlineLogout style={{ color: "#fff", fontSize: "18px" }} />} // White icon
          onClick={onLogout}
        />
      </div>
    </Header>
  );
};

export default AppHeader;
