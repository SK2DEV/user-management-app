import { useState } from "react";
import { Card, Avatar, Pagination, Row, Col } from "antd";
import {  DeleteOutlined, EditTwoTone } from "@ant-design/icons";
import "../../App.css";
import ActionButtons from "../../helpers/action-button";


const { Meta } = Card;

const UserCard = ({ users, onEdit, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8
  const startIndex = (currentPage - 1) * pageSize;
  const currentUsers = users.slice(startIndex, startIndex + pageSize);

  return (
    <div className="user-page">
      <Row gutter={[16, 16]}>
        {currentUsers.map((user) => (
          <Col xs={24} sm={12} md={6} key={user.id}>
            <div className="user-card-wrapper">
              <Card
                hoverable
                className="user-card"
                headStyle={{ border: "none" }}

                cover={<Avatar src={user.avatar} size={80} className="user-avatar" />}
              >
                <Meta title={`${user.first_name} ${user.last_name}`} description={user.email} />
              </Card>

              {/* Hover Overlay */}
              <div className="user-card-overlay">
              <ActionButtons
  record={user}
  mode="card"
  onEdit={onEdit }

  onDelete={onDelete} 
/>
              </div>
            </div>
          </Col>
        ))}
      </Row>

      {/* Pagination */}
      <div className="pagination-container">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={users.length}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default UserCard;
