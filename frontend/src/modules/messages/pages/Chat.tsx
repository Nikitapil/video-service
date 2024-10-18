import { Link, useParams } from 'react-router-dom';
import { useGetChatQuery } from '../../../gql/graphql.tsx';
import { ImSpinner2 } from 'react-icons/im';
import { getProfileLink } from '../../../router/routes.ts';
import UserAvatar from '../../shared/components/UserAvatar.tsx';
import { useMemo } from 'react';
import Message from '../components/Message.tsx';

const Chat = () => {
  const { id } = useParams();

  const { data, loading } = useGetChatQuery({
    variables: {
      chatId: id || ''
    }
  });

  const chat = useMemo(() => {
    return data?.getChat;
  }, [data?.getChat]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <ImSpinner2
          className="ml-1 animate-spin"
          size="100"
        />
      </div>
    );
  }

  if (!chat) {
    return <p className="text-center text-xl font-semibold">Chat Not Found</p>;
  }

  return (
    <div className="p-4">
      <Link
        to={getProfileLink(chat.chatWithUser.id)}
        className="flex items-center gap-4 border-b pb-3"
      >
        <UserAvatar image={chat.chatWithUser.image} />
        <span className="font-semibold">{chat.chatWithUser.fullname}</span>
      </Link>

      <div className="mt-4 flex flex-col gap-4">
        {chat.messages.map((message) => (
          <Message
            key={message.id}
            message={message}
          />
        ))}
      </div>
    </div>
  );
};

export default Chat;
