import UserAvatar from '../../shared/components/UserAvatar.tsx';
import { User } from '../../../gql/graphql.tsx';
import { Link } from 'react-router-dom';
import { getProfileLink } from '../../../router/routes.ts';

interface UserListItemProps {
  user: User;
}

const UserListItem = ({ user }: UserListItemProps) => {
  return (
    <Link
      className="flex gap-2 px-2 py-3 common-transition hover:bg-gray-50"
      to={getProfileLink(user.id)}
    >
      <UserAvatar
        image={user.image}
        className="!h-12 !w-12"
      />

      <div>
        <h3 className="text-lg font-semibold">{user.fullname}</h3>

        <p className="max-w-80 overflow-hidden text-ellipsis whitespace-nowrap text-gray-600">{user.bio}</p>
      </div>
    </Link>
  );
};

export default UserListItem;
