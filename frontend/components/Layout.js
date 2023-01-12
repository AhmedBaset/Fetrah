import Header from "./Header";


const Layout = ({ children }) => {
  return (
    <>
      <Header expand="md" color="light" light={true}/>
      {children}
      <p>Footer</p>
    </>
  );
};

export default Layout;
