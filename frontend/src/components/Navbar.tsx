import React from "react";

const Navbar = () => {
  return (
    <div className="h-[5vh] md:h-[6vh] xl:h-[7vh] w-full bg-theme-background1 px-5 md:px-6 xl:px-8 flex items-center shadow-md border-b border-gray-200 z-50">
      <h1 className="text-h5-mobile md:text-h5-tablet xl:text-h5-desktop">
        {location.pathname === "/"
          ? "Home"
          : location.pathname === "/view"
          ? "Team Details"
          : location.pathname === "/wins"
          ? "Top teams with min wins"
          : location.pathname === "/add"
          ? "Add Team"
          : location.pathname === "/edit"
          ? "Edit Team"
          : location.pathname === "/stats"
          ? "Teams by year with average goals for that year"
          : location.pathname === "/year"
          ? "Get stats for year"
          : "Undefined Page!"}
      </h1>
    </div>
  );
};

export default Navbar;
