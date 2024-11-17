import MainLayout from '../../../../layouts/main/MainLayout.tsx';
import { useSearchParams } from 'react-router-dom';
import { useGetUsersQuery } from '../../../../gql/graphql.tsx';
import UsersList from '../../components/UsersList.tsx';
import { useCallback } from 'react';
import Observer from '../../../../components/Observer.tsx';

const UsersPage = () => {
  const [searchParams] = useSearchParams();

  const { data, loading, fetchMore } = useGetUsersQuery({
    variables: {
      search: searchParams.get('search') || '',
      take: 10,
      skip: 0
    }
  });

  const loadMoreUsers = useCallback(async () => {
    await fetchMore({
      variables: {
        skip: data?.getUsers.length || 0,
        take: 10,
        search: searchParams.get('search') || ''
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return prev;
        }
        return {
          getUsers: [...prev.getUsers, ...fetchMoreResult.getUsers]
        };
      }
    });
  }, [data?.getUsers.length, fetchMore, searchParams]);

  return (
    <MainLayout>
      <div className="py-3">
        <UsersList
          isLoading={loading}
          users={data?.getUsers}
        />
        {(data?.getUsers.length || 0) > 9 && <Observer callback={loadMoreUsers} />}
      </div>
    </MainLayout>
  );
};

export default UsersPage;
