import { createBrowserRouter } from 'react-router-dom';
import Feed from '../modules/feed/pages/Feed.tsx';
import Upload from '../modules/upload/pages/Upload.tsx';
import Profile from '../modules/profile/pages/Profile.tsx';
import Post from '../modules/post/pages/Post.tsx';
import ProtectedRoutes from '../modules/shared/auth/components/ProtectedRoutes.tsx';
import Users from '../modules/users/pages/Users.tsx';

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
    element: (
      <ProtectedRoutes>
        <Profile />
      </ProtectedRoutes>
    )
  },
  {
    path: '/post/:id',
    element: (
      <ProtectedRoutes>
        <Post />
      </ProtectedRoutes>
    )
  },
  {
    path: '/users/',
    element: (
      <ProtectedRoutes>
        <Users />
      </ProtectedRoutes>
    )
  }
]);
