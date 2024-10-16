import { ChatListItemType } from '../types';
import UserAvatar from '../../shared/components/UserAvatar.tsx';
import { Link } from 'react-router-dom';
import { getChatUrl } from '../../../router/routes.ts';

interface ChatListItemProps {
  chat: ChatListItemType;
}

const ChatListItem = ({ chat }: ChatListItemProps) => {
  return (
    <Link
      to={getChatUrl(chat.id)}
      className="flex max-w-full items-center gap-5 rounded-lg p-3 common-transition hover:bg-blue-50"
    >
      <UserAvatar
        image={chat.chatWithUser.image}
        className="h-8"
      />

      <div className="max-w-full flex-1 overflow-hidden">
        <h6 className="font-semibold">{chat.chatWithUser.fullname}</h6>

        <p className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-xs font-light text-gray-600">
          <span className="font-semibold">{chat.lastMessage.author.fullname}: </span>
          <span>{chat.lastMessage.text}</span>
        </p>
      </div>

      {!!chat.unreadMessagesCount && (
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-sm text-white">
          {chat.unreadMessagesCount}
        </div>
      )}
    </Link>
  );
};

export default ChatListItem;
