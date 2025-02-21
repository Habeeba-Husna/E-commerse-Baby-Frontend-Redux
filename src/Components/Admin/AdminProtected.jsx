import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminProtected = () => {
  const user = useSelector((state) => state.auth.user);

  if (!user || !user.isAdmin) {
    return <Navigate to="/login" />;
  }

  return <Outlet />; // Allow access if user is an admin
};

export default AdminProtected;

