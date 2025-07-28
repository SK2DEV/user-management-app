import { Layout, Avatar } from "antd";
import { AiOutlineLogout } from "react-icons/ai";

const { Header } = Layout;

const AppHeader = ({ username = "Elon Mask", onLogout }) => {
  return (
    <Header className="app-header">
      <div className="app-user-info">
        <span className="app-username">{username}</span>
        <Avatar
          className="logout-icon"
          icon={<AiOutlineLogout />}
          onClick={onLogout}
        />
      </div>
    </Header>
  );
};

export default AppHeader;
