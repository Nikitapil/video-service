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
import NotFoundPage from '../components/NotFoundPage.tsx';

export const router = createBrowserRouter([
  {
    path: RoutesEnum.HOME,
    errorElement: <NotFoundPage text="Page not found" />,
    element: (
      <ProtectedRoutes>
        <MainLayout />
      </ProtectedRoutes>
    ),
    children: [
      {
        index: true,
        element: <Feed />
      },
      {
        path: RoutesEnum.PROFILE,
        element: <Profile />
      },
      {
        path: RoutesEnum.USERS,
        element: <UsersPage />
      },
      {
        path: RoutesEnum.MESSAGES,
        element: <Chats />
      },
      {
        path: RoutesEnum.USERS_FOLLOW,
        element: <FollowUsersPage />
      },
      {
        path: RoutesEnum.CHAT,
        element: <Chat />
      }
    ]
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
    path: RoutesEnum.POST,
    element: (
      <ProtectedRoutes>
        <Post />
      </ProtectedRoutes>
    )
  }
]);
