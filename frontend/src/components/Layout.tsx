import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Loader, { LoaderRef } from "./loader";
import { useRef, useEffect } from "react";
import loaderManager from "../helpers/loaderManager";

const Layout = () => {
  const location = useLocation();

  const loaderRef = useRef<LoaderRef>(null);

  useEffect(() => {
    if (loaderRef.current) {
      if (loaderRef.current) {
        loaderManager.registerLoader(loaderRef.current);
      }
    }
  }, [loaderRef]);

  return (
    <div className="h-screen w-screen overflow-clip overscroll-none relative">
      <div className="h-screen w-screen">
        <Navbar />
        <div className="h-full w-full">
          <Outlet />
        </div>
      </div>
      <Loader ref={loaderRef} />
    </div>
  );
};

export default Layout;
