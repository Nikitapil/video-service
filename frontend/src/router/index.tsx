import { createBrowserRouter } from 'react-router-dom';
import Feed from '../modules/feed/pages/Feed.tsx';
import Upload from '../modules/upload/pages/Upload.tsx';
import Profile from '../modules/profile/pages/Profile.tsx';
import Post from '../modules/post/pages/Post.tsx';
import ProtectedRoutes from '../modules/shared/auth/components/ProtectedRoutes.tsx';
import UsersPage from '../modules/users/pages/Users/UsersPage.tsx';
import { RoutesEnum } from './routes.ts';
import Chats from '../modules/messages/pages/Chats.tsx';
import FollowUsersPage from '../modules/users/pages/Users/FollowUsersPage.tsx';
import Chat from '../modules/messages/pages/Chat.tsx';
import MainLayout from '../layouts/main/MainLayout.tsx';

export const router = createBrowserRouter([
  {
    path: RoutesEnum.HOME,
    element: (
      <ProtectedRoutes>
        <Feed />
      </ProtectedRoutes>
    )
  },
  {
    path: RoutesEnum.UPLOAD,
    element: (
      <ProtectedRoutes>
        <Upload />
      </ProtectedRoutes>
    )
  },
  {
    path: RoutesEnum.PROFILE,
    element: (
      <ProtectedRoutes>
        <Profile />
      </ProtectedRoutes>
    )
  },
  {
    path: RoutesEnum.POST,
    element: (
      <ProtectedRoutes>
        <Post />
      </ProtectedRoutes>
    )
  },
  {
    path: RoutesEnum.USERS,
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
        <Chats />
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
  },
  {
    path: RoutesEnum.CHAT,
    element: (
      <ProtectedRoutes>
        <MainLayout>
          <Chat />
        </MainLayout>
      </ProtectedRoutes>
    )
  }
]);
