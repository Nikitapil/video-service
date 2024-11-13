import MainLayout from '../../../../layouts/main/MainLayout.tsx';
import UsersList from '../../components/UsersList.tsx';
import { useParams } from 'react-router-dom';
import { useMemo } from 'react';
import { UserFollowPagesTypesEnum } from '../../../../router/routes.ts';
import { useGetUsersQuery } from '../../../../gql/graphql.tsx';

const FollowUsersPage = () => {
  const { type } = useParams<{ type: UserFollowPagesTypesEnum }>();

  const { data, loading } = useGetUsersQuery({
    variables: {
      userFollowers: type === UserFollowPagesTypesEnum.FOLLOWERS,
      userFollowTo: type === UserFollowPagesTypesEnum.FOLLOWING
    }
  });

  const users = useMemo(() => {
    return data?.getUsers;
  }, [data?.getUsers]);

  const title = useMemo(() => {
    return type === UserFollowPagesTypesEnum.FOLLOWERS ? 'Followers' : 'Following';
  }, [type]);

  return (
    <MainLayout>
      <div className="py-3">
        <h2 className="text-center text-xl font-semibold">{title}</h2>
        <UsersList
          isLoading={loading}
          users={users}
        />
      </div>
    </MainLayout>
  );
};

export default FollowUsersPage;
