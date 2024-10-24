import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import LoadingScreen from "@/components/LoadingScreen";
import SideNav from "@/components/SideNav";
import TopBar from "@/components/TopBar";

function Layout() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <LoadingScreen isLoading={isLoading}>
      <>
        <SideNav />
        <div className="h-screen py-4 sm:ml-64">
          <TopBar />
          <div className="px-4">
            <Outlet />
          </div>
        </div>
      </>
    </LoadingScreen>
  );
}

export default Layout;
