import MainLayout from '../../../../layouts/main/MainLayout.tsx';
import UsersList from '../../components/UsersList.tsx';
import { useParams } from 'react-router-dom';
import { useMemo } from 'react';
import { UserFollowPagesTypesEnum } from '../../../../router/routes.ts';

const FollowUsersPage = () => {
  const { type } = useParams<{ type: UserFollowPagesTypesEnum }>();

  const title = useMemo(() => {
    return type === UserFollowPagesTypesEnum.FOLLOWERS ? 'Followers' : 'Following';
  }, [type]);

  return (
    <MainLayout>
      <div className="py-3">
        <h2 className="text-center text-xl font-semibold">{title}</h2>
        <UsersList
          isLoading={false}
          users={[]}
        />
      </div>
    </MainLayout>
  );
};

export default FollowUsersPage;
