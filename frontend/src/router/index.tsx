import {createBrowserRouter} from "react-router-dom";
import Feed from "../pages/Feed.tsx";
import Upload from "../pages/Upload.tsx";
import Profile from "../pages/Profile.tsx";
import Post from "../pages/Post.tsx";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Feed />
  },
  {
    path: '/upload',
    element: <Upload />
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