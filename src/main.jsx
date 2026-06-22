import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from "./store/store.js"
import { createBrowserRouter, RouterProvider } from 'react-router'
import Home from './pages/Home.jsx'
import { AuthLayout, Login, Signup } from './components/index.js'
import AllPosts from "./pages/AllPosts.jsx"
import AddPost from "./pages/AddPost.jsx"
import EditPost from './pages/EditPost.jsx'
import Post from './pages/Post.jsx'
import Profile from "./pages/Profile.jsx"
import EditProfile from "./pages/EditProfile.jsx"
import Search from "./pages/Search.jsx"
import MyPosts from "./pages/MyPosts.jsx"
import LikedPosts from './pages/LikedPosts.jsx'
import VisitProfile from './pages/VisitProfile.jsx'
import '@fortawesome/fontawesome-free/css/all.min.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        )
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        )
      },
      {
        path: "/all-posts",
        element: (
          <AuthLayout authentication>
            {" "}
            <AllPosts />
          </AuthLayout>
        )
      },
      {
        path: "/add-post",
        element: (
          <AuthLayout authentication>
            {" "}
            <AddPost />
          </AuthLayout>
        )
      },
      {
        path: "/edit-post/:slug",
        element: (
          <AuthLayout authentication>
            {" "}
            <EditPost />
          </AuthLayout>
        )
      },
      {
        path: "/post/:slug",
        element: <Post />
      },
      {
        path: "/profile/:userId",
        element: (
          <AuthLayout authentication>
            <Profile />
          </AuthLayout>
        )
      },
      {
        path: "/edit-profile/:userId",
        element: (
          <AuthLayout authentication>
            <EditProfile />
          </AuthLayout>
        )
      },
      {
        path: "/search",
        element: (
          <AuthLayout authentication>
            <Search />
          </AuthLayout>
        )
      },
      {
        path: "/visit-profile/:userId",
        element: (
          <AuthLayout authentication>
            <VisitProfile />
          </AuthLayout>
        )
      },
      {
        path: "/my-posts",
        element: (
          <AuthLayout authentication>
            <MyPosts />
          </AuthLayout>
        )
      },
      {
        path: "/liked-posts",
        element: (
          <AuthLayout authentication>
            <LikedPosts />
          </AuthLayout>
        )
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)