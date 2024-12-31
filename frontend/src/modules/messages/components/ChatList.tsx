import { ImSpinner2 } from 'react-icons/im';
import { ChatListType } from '../types.ts';
import ChatListItem from './ChatListItem.tsx';

interface ChatListProps {
  chats: ChatListType;
  isLoading: boolean;
}

const ChatList = ({ chats, isLoading }: ChatListProps) => {
  if (isLoading) {
    return (
      <div
        className="flex h-full w-full items-center justify-center p-10"
        data-testid="chat-list-loader"
      >
        <ImSpinner2
          className="animate-spin"
          size="120"
          color=""
        />
      </div>
    );
  }

  if (!chats.length) {
    return (
      <h3
        className="text-center text-xl font-semibold"
        data-testid="no-chats-text"
      >
        No chats yet!
      </h3>
    );
  }

  return (
    <section data-testid="chat-list">
      {chats.map((chat) => (
        <ChatListItem
          chat={chat}
          key={chat.id}
        />
      ))}
    </section>
  );
};

export default ChatList;
