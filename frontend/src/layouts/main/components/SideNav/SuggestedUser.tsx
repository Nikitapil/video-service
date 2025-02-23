import UserAvatar from '../../../../modules/shared/components/UserAvatar.tsx';
import { User } from '../../../../gql/graphql.tsx';
import { Link } from 'react-router-dom';
import { getProfileLink } from '../../../../router/routes.ts';

interface SuggestedUserProps {
  user: User;
}

const SuggestedUser = ({ user }: SuggestedUserProps) => {
  return (
    <Link
      to={getProfileLink(user.id)}
      className="flex w-full items-center rounded-md px-2 py-1.5 hover:bg-gray-100"
    >
      <UserAvatar image={user.image} />

      <div className="hidden max-w-full lg:block lg:pl-2.5">
        <h4 className="text-sm font-bold">{user.fullname}</h4>

        <p className="max-w-40 overflow-hidden text-ellipsis whitespace-nowrap text-xs font-light text-gray-600">
          {user.bio}
        </p>
      </div>
    </Link>
  );
};

export default SuggestedUser;
