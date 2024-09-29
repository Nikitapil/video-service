import { createBrowserRouter } from 'react-router-dom';
import Feed from '../modules/feed/pages/Feed.tsx';
import Upload from '../modules/upload/pages/Upload.tsx';
import Profile from '../modules/profile/pages/Profile.tsx';
import Post from '../modules/post/pages/Post.tsx';
import ProtectedRoutes from '../modules/shared/auth/components/ProtectedRoutes.tsx';
import UsersPage from '../modules/users/pages/Users/UsersPage.tsx';
import { RoutesEnum } from './routes.ts';
import Messages from '../modules/messages/pages/Messages.tsx';
import FollowUsersPage from '../modules/users/pages/Users/FollowUsersPage.tsx';

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
    path: '/users',
    element: (
      <ProtectedRoutes>
        <UsersPage />
      </ProtectedRoutes>
    )
  },
  {
    path: RoutesEnum.MESSAGES,
    element: (
      <ProtectedRoutes>
        <Messages />
      </ProtectedRoutes>
    )
  },
  {
    path: RoutesEnum.USERS_FOLLOW,
    element: (
      <ProtectedRoutes>
        <FollowUsersPage />
      </ProtectedRoutes>
    )
  }
]);
