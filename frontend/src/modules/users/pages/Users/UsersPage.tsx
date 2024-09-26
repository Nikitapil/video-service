import MainLayout from '../../../../layouts/main/MainLayout.tsx';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_USERS } from '../../queries/GetUsers.ts';
import { GetUsersQuery, GetUsersQueryVariables } from '../../../../gql/graphql.tsx';
import UsersList from '../../components/UsersList.tsx';

const UsersPage = () => {
  const [searchParams] = useSearchParams();

  const { data, loading } = useQuery<GetUsersQuery, GetUsersQueryVariables>(GET_USERS, {
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
