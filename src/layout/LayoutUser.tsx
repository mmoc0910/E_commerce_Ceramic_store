import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";

const LayoutUser = () => {
  return (
    <div>
      <Header />
      <Outlet></Outlet>
    </div>
  );
};

export default LayoutUser;
