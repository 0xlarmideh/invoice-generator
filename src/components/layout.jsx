import Navbar from "./navbar";
import { Outlet } from "react-router-dom";

const Layout = ({onClick}) => {
  return (
    <>
      <Navbar onClick={onClick} />
      <Outlet />
    </>
  );
}

export default Layout