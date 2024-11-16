import MainLayout from '../../../../layouts/main/MainLayout.tsx';
import { useSearchParams } from 'react-router-dom';
import { useGetUsersQuery } from '../../../../gql/graphql.tsx';
import UsersList from '../../components/UsersList.tsx';

const UsersPage = () => {
  const [searchParams] = useSearchParams();

  const { data, loading } = useGetUsersQuery({
    variables: {
      search: searchParams.get('search') || ''
    }
  });

  return (
    <MainLayout>
      <div className="py-3">
        <UsersList
          isLoading={loading}
          users={data?.getUsers}
        />
      </div>
    </MainLayout>
  );
};

export default UsersPage;
