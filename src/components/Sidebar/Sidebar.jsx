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
    <aside className="w-64 min-h-96 bg-slate-900 border-r border-slate-700 p-4">

      <div className="flex flex-col gap-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `px-4 py-3 rounded-lg transition ${
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