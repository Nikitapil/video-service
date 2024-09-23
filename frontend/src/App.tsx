import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { ApolloProvider } from '@apollo/client';
import { client } from './utils/apolloClient.ts';
import { useGeneralStore } from './modules/shared/stores/generalStore.ts';
import EditProfileModal from './modules/profile/components/EditProfileModal.tsx';

function App() {
  const isEditProfileOpen = useGeneralStore((state) => state.isEditProfileOpen);

  return (
    <>
      {
        <ApolloProvider client={client}>
          <RouterProvider router={router} />
          {isEditProfileOpen && <EditProfileModal />}
        </ApolloProvider>
      }
    </>
  );
}

export default App;
