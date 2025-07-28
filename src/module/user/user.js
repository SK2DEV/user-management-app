import {
  Button,
  Form,
  Input,
  Radio,
  Spin,
  Tooltip,
  Pagination,
  ConfigProvider,
  message,
} from "antd";
import PageLayout from "../../utils/page-layout";
import UserTable from "./userTable";
import UserCard from "./userCard";
import UserForm from "./userForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import {
  addUser,
  editUser,
  fetchUsers,
  removeUser,
  selectFilteredUsers,
  setSearchQuery,
} from "../../store/slices/user-slice";
import {
  PlusOutlined,
  TableOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";

const { Search } = Input;

const User = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const fetchedRef = useRef(false);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [activeTab, setActiveTab] = useState("table");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 576);
  const [currentPage, setCurrentPage] = useState(1);

  const users = useSelector(selectFilteredUsers);
  const loading = useSelector((state) => state.users.loading);

  const pageSize = activeTab === "table" ? 5 : 6;


  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 576);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!fetchedRef.current) {
      dispatch(fetchUsers());
      fetchedRef.current = true;
    }
  }, [dispatch]);

  const paginatedUsers = users.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
const handleSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
    setCurrentPage(1);
  };

  const handleOpenCreateModal = () => {
    setEditingUser(null);
    setIsModalVisible(true);
  };

  const handleTabChange = (e) => {
    setActiveTab(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => setCurrentPage(page);
  const handleFormCancel = () => setIsModalVisible(false);

  const handleSubmitUser = async (userData) => {
    try {
      setSaving(true);
      setIsModalVisible(false);

      if (userData.id) {
        await dispatch(editUser({ id: userData.id, data: userData })).unwrap();
        message.success(`User ${userData.first_name} updated successfully!`);
      } else {
        await dispatch(addUser(userData)).unwrap();
        message.success(`User ${userData.first_name} added successfully!`);
      }
    } catch (error) {
      message.error("Failed to save user");
    } finally {
      setSaving(false);
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setIsModalVisible(true);
  };

  const handleDeleteUser = async (id) => {
    const previousUsers = [...users];
    const userToDelete = users.find((u) => u.id === id);

    dispatch({ type: "users/removeUserLocal", payload: id });

    try {
      await dispatch(removeUser(id)).unwrap();
      message.success(`User ${userToDelete.first_name} deleted successfully!`);
    } catch (error) {
      message.error("Failed to delete user. Restoring previous state.");
      dispatch({ type: "users/setUsers", payload: previousUsers });
    }
  };

 
  return (
    
      <PageLayout
        title="Users"
        filter={
          <Search
            placeholder="Search user"
            allowClear
            style={{ width: 200 }}
            onChange={handleSearchChange}
          />
        }
        action={
          isMobile ? (
            <Tooltip title="Create User">
              <Button
                type="primary"
                shape="circle"
                icon={<PlusOutlined />}
                onClick={handleOpenCreateModal}
              />
            </Tooltip>
          ) : (
            <Button
              type="primary"
              onClick={handleOpenCreateModal}
            >
              Create User
            </Button>
          )
        }
        pagination={
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={users.length}
            onChange={handlePageChange}
            showSizeChanger={false}
          />
        }
      >
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "60vh",
            }}
          >
            <Spin size="large" tip="Loading Users..." />
          </div>
        ) : (
          <>
          
            <div >
              <Radio.Group
                value={activeTab}
                onChange={handleTabChange}
                optionType="button"
                buttonStyle="solid"
                size="small"
              >
                {isMobile ? (
                  <>
                    <Tooltip title="Table View">
                      <Radio.Button value="table">
                        <TableOutlined />
                      </Radio.Button>
                    </Tooltip>
                    <Tooltip title="Card View">
                      <Radio.Button value="card">
                        <UnorderedListOutlined />
                      </Radio.Button>
                    </Tooltip>
                  </>
                ) : (
                  <>
                    <Radio.Button value="table">
                      <TableOutlined /> Table
                    </Radio.Button>
                    <Radio.Button value="card">
                      <UnorderedListOutlined /> Card
                    </Radio.Button>
                  </>
                )}
              </Radio.Group>
            </div>

            {activeTab === "table" ? (
              <UserTable
                users={paginatedUsers}
                onEdit={handleEditUser}
                onDelete={handleDeleteUser}
              />
            ) : (
              <UserCard
                users={paginatedUsers}
                onEdit={handleEditUser}
                onDelete={handleDeleteUser}
              />
            )}
          </>
        )}

        <UserForm
          form={form}
          visible={isModalVisible}
          onCancel={handleFormCancel}
          onSubmit={handleSubmitUser}
          editingUser={editingUser}
          saving={saving}
        />
      </PageLayout>
  );
};

export default User;
