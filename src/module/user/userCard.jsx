import { Card, Avatar, Row, Col } from "antd";
import "../../App.css";
import ActionButtons from "../../helpers/action-button";

const { Meta } = Card;

const UserCard = ({ users, onEdit, onDelete }) => {
  return (
    <div className="user-page">
      <Row gutter={[24, 24]}>
        {users.map((user) => (
          <Col xs={24} sm={12} md={8} lg={8} key={user.id}>
            <div className="user-card-wrapper">
              <Card hoverable className="user-card">
                <Avatar src={user.avatar} size={160} className="user-avatar" />
                <Meta
                  title={`${user.first_name} ${user.last_name}`}
                  description={user.email}
                />
              </Card>

              <div className="user-card-overlay">
                <ActionButtons
                  record={user}
                  mode="card"
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default UserCard;
