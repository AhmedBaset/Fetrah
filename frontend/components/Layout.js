import Header from "./Header";


const Layout = ({ children }) => {
  return (
    <>
      <Header expand="md"/>
      {children}
    </>
  );
};

export default Layout;
