import React from "react";
import {Container, Logo, LogoutBtn} from "../index"
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ]

  return(
    <header className="py-3 shadow-lg bg-slate-800 border-b border-slate-700">
      <Container>
        <nav className="flex flex-col md:flex-row items-center">
          <div className="mr-4">
            <Link to='/'>
              <Logo width="70px" />
            </Link>
          </div>
          <ul
            className="
              grid
              grid-cols-2
              md:flex
              ml-auto
              w-full
              md:w-auto
              gap-2
              mt-2
              md:mt-0
            "
          >
            {navItems.map((item) => item.active ? (
              <li key={item.name}>
                <button 
                onClick={() => navigate(item.slug)}
                className="w-full text-center px-3 md:px-6 py-2 duration-200 text-slate-200 hover:bg-violet-500 hover:text-white rounded-full"
                >{item.name}</button>
              </li>
            ) : null)}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header