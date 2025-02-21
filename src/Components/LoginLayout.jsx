import { Outlet } from "react-router-dom";

export const LoginLayout = () => {
  return (
    <div>
      <Outlet />    {/* This will render the child components like Login & Register */}
    </div>
  );
};