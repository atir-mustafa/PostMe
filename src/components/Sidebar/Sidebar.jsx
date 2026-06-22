import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function Sidebar() {
  const authStatus = useSelector((state) => state.auth.status);

  const userData = useSelector(
    (state) => state.auth.userData
  );

  if (!authStatus) return null;

  const menuItems = [
    {
      name: "Profile",
      path: `/profile/${userData?.$id}`,
    },
    {
      name: "Search People",
      path: "/search",
    },
    {
      name: "Your Posts",
      path: "/my-posts",
    },
    {
      name: "Liked Posts",
      path: "/liked-posts",
    }
  ];

  return (
    <aside
      className="
        fixed
        h-15
        bottom-0
        left-0
        right-0
        z-50

        md:static

        bg-slate-900
        border-t
        md:border-t-0
        md:border-r
        border-slate-700

        p-2
        md:p-4

        w-full
        md:w-64
      "
    >

      <div
        className="
          flex
          justify-around

          md:flex-col
          md:justify-start

          gap-1
          md:gap-2
        "
      >
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `px-2 md:px-4 py-2 md:py-3 text-xs md:text-base text-center rounded-lg transition 
              ${
                isActive
                  ? "bg-violet-600 text-white"
                  : "hover:bg-slate-700"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </div>
    </aside>
  );
}

export default Sidebar;