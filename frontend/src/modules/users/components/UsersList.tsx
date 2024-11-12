import { User } from '../../../gql/graphql.tsx';
import { ImSpinner2 } from 'react-icons/im';
import UserListItem from './UserListItem.tsx';

interface UsersListProps {
  users?: User[];
  isLoading: boolean;
}
const UsersList = ({ users, isLoading }: UsersListProps) => {
  if (isLoading) {
    return (
      <div className="flex w-full items-center justify-center p-5">
        <ImSpinner2
          className="ml-1 animate-spin"
          size="100"
          color=""
        />
      </div>
    );
  }

  if (!users?.length) {
    return <p className="text-center text-xl font-bold">Users not found</p>;
  }

  return (
    <div className="flex flex-col">
      {users.map((user) => (
        <div key={user.id}>
          <UserListItem user={user} />
          <hr />
        </div>
      ))}
    </div>
  );
};

export default UsersList;
