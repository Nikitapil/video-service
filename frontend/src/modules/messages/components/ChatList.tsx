import { GetChatsListQuery } from '../../../gql/graphql.tsx';
import { ImSpinner2 } from 'react-icons/im';

interface ChatListProps {
  chats: GetChatsListQuery['getChatList'];
  isLoading: boolean;
}

const ChatList = ({ chats, isLoading }: ChatListProps) => {
  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center p-10">
        <ImSpinner2
          className="animate-spin"
          size="120"
          color=""
        />
      </div>
    );
  }

  if (!chats.length) {
    return <h3 className="text-center text-xl font-semibold">No chats yet!</h3>;
  }

  return <section>Chats will be here</section>;
};

export default ChatList;
