import {createBrowserRouter} from "react-router-dom";
import Feed from "../pages/Feed.tsx";
import Upload from "../pages/Upload.tsx";
import Profile from "../pages/Profile.tsx";
import Post from "../pages/Post.tsx";
import ProtectedRoutes from "../components/ProtectedRoutes.tsx";

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoutes>
        <Feed />
      </ProtectedRoutes>
    )
  },
  {
    path: '/upload',
    element: (
      <ProtectedRoutes>
        <Upload />
      </ProtectedRoutes>
    )
  },
  {
    path: '/profile/:id',
    element: <Profile />
  },
  {
    path: '/post/:id',
    element: <Post />
  }
])