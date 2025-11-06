import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import Search from "../components/Search";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";

const RootLayout = () => {
  // destructure "handleGetUser" function from the useAuth hook.
  const { handleGetUser } = useAuth();

  // Calls "handleGetUser" when the component mounts to fetch user data
  useEffect(() => {
    handleGetUser();
  }, [handleGetUser]);

  return (
    <div className="relative">
      <SideBar />
      <div className="relative lg:ms-[164px] h-screen sm:mt-[25px]">
        <Search />
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
