import UsersList from '../../components/UsersList.tsx';
import { useParams } from 'react-router-dom';
import { useMemo } from 'react';
import { UserFollowPagesTypesEnum } from '../../../../router/routes.ts';
import { useGetUsersQuery } from '../../../../gql/graphql.tsx';

const FollowUsersPage = () => {
  const { type, userId = 0 } = useParams<{ type: UserFollowPagesTypesEnum; userId: string }>();

  const { data, loading } = useGetUsersQuery({
    variables: {
      userFollowers: type === UserFollowPagesTypesEnum.FOLLOWERS ? +userId : null,
      userFollowTo: type === UserFollowPagesTypesEnum.FOLLOWING ? +userId : null
    }
  });

  const users = useMemo(() => {
    return data?.getUsers;
  }, [data?.getUsers]);

  const title = useMemo(() => {
    return type === UserFollowPagesTypesEnum.FOLLOWERS ? 'Followers' : 'Following';
  }, [type]);

  return (
    <div className="py-3">
      <h2 className="text-center text-xl font-semibold">{title}</h2>
      <UsersList
        isLoading={loading}
        users={users}
      />
    </div>
  );
};

export default FollowUsersPage;
