import Header from "./Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = ({ children }) => {
  return (
    <>
      <Header expand="md" />
      <ToastContainer />
      {children}
    </>
  );
};

export default Layout;
