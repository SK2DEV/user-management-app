import { Button, Form, Input, Radio, Spin, Tabs, message } from "antd";
import PageLayout from "../../utils/page-layout";
import UserTable from "./userTable";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { addUser, editUser, fetchUsers, removeUser, selectFilteredUsers, setSearchQuery } from "../../store/slices/user-slice";
import UserForm from "./userForm";
import UserCard from "./userCard";
import { AppstoreOutlined, TableOutlined, UnorderedListOutlined } from "@ant-design/icons";

const { Search } = Input;
const { TabPane } = Tabs;


const User = () => {
  const [form] = Form.useForm();

  const fetchedRef = useRef(false);
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [saving, setSaving] = useState(false);
const[editingUser,setEditingUser]=useState(null)
  const [activeTab, setActiveTab] = useState("table"); 
  const users = useSelector(selectFilteredUsers);
  const loading = useSelector((state) => state.users.loading);


  useEffect(() => {
    if (!fetchedRef.current) {
      dispatch(fetchUsers());
      fetchedRef.current = true;
    }
  }, [dispatch]);

  const handleSubmitUser = async (userData) => {
    try {
      setSaving(true);
      setIsModalVisible(false); 
  
      if (userData.id) {
        await dispatch(editUser({ id: userData.id, data: userData })).unwrap();
        message.success("User updated successfully!");
      } else {
        await dispatch(addUser(userData)).unwrap();
        message.success("User added successfully!");
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
    const previousUsers = [...users]; // <-- users from useSelector
  
    // ✅ Remove user immediately from UI
    dispatch({ type: "users/removeUserLocal", payload: id });
  
    const hide = message.loading("Deleting user...", 0);
  
    try {
      await dispatch(removeUser(id)).unwrap(); // API call
      hide();
      message.success("User deleted successfully!");
    } catch (error) {
      hide();
      message.error("Failed to delete user. Restoring previous state.");
      // ✅ Rollback UI
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
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        />
      }
      action={

        <Button
          type="primary"
          onClick={() => {
            setEditingUser(null)
            setIsModalVisible(true);
          }}
        >
          Create User
        </Button>
      }
    >
      {loading ? (
       
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "60vh", // Or Page height
          }}
        >
          <Spin size="large" tip="Loading Users..." />
          </div>
      ) : (
        <>
         <Radio.Group
      value={activeTab}
      onChange={(e) => setActiveTab(e.target.value)}
      optionType="button"
      buttonStyle="solid"
      size="small"   
    >
      <Radio.Button value="table" >
        <TableOutlined /> Table
      </Radio.Button>
      <Radio.Button value="card">
        <UnorderedListOutlined /> Card
      </Radio.Button>
    </Radio.Group>

          {activeTab === "table" ? (
            <UserTable users={users} onEdit={handleEditUser} onDelete={handleDeleteUser} />
          ) : (
            <UserCard users={users} onEdit={handleEditUser} onDelete={handleDeleteUser} />
          )}
        </>
      )}

       
      <UserForm
      form={form}
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);  

        }}
        onSubmit={handleSubmitUser}
        editingUser={editingUser}
        saving={saving}
      />
    </PageLayout>
  );
};

export default User;
