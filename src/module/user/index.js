import { Routes, Route } from "react-router-dom";
import User from "./user";


const UserRoutes = () => {
  return (
    <Routes>
      <Route index element={<User />} />
    </Routes>
  );
};

export default UserRoutes;
