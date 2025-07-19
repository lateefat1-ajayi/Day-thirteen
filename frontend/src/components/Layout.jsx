import NavBar from "./NavBar";


const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white">
      <NavBar />
      <main className="p-4">{children}</main>
    </div>
  );
};

export default Layout;
