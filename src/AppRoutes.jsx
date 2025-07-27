import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./component/login";
import ProtectedRoute from "./utils/protected-route";
import UserRoutes from "./module/user";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/users/*" element={<UserRoutes />} />
        </Route>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
