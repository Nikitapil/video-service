import { Link, useParams } from 'react-router-dom';
import { useCreateMessageMutation, useGetChatQuery, useOpenMessagesMutation } from '../../../gql/graphql.tsx';
import { ImSpinner2 } from 'react-icons/im';
import { getProfileLink } from '../../../router/routes.ts';
import UserAvatar from '../../shared/components/UserAvatar.tsx';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Message from '../components/Message.tsx';
import Observer from '../../../components/Observer.tsx';
import AppForm from '../../../components/ui/AppForm.tsx';
import AppTextarea from '../../../components/ui/inputs/AppTextarea.tsx';
import AppButton from '../../../components/ui/AppButton.tsx';
import { RiSendPlane2Fill } from 'react-icons/ri';
import { useSockets } from '../../../hooks/useSockets.ts';
import { TMessage } from '../types.ts';
import { useScrollBottom } from '../../../hooks/useScrollBottom.ts';

const Chat = () => {
  const { id } = useParams();
  const { socket, joinRoom } = useSockets();

  const [messages, setMessages] = useState<TMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');

  const messagesContainerRef = useScrollBottom<HTMLDivElement, TMessage[]>(messages);

  const [createMessage, { loading: isCreateMessageInProgress }] = useCreateMessageMutation();

  const { data, loading } = useGetChatQuery({
    variables: {
      chatId: id || ''
    },
    onCompleted(value) {
      setMessages(value.getChat.messages);
    }
  });

  const [openMessages] = useOpenMessagesMutation({
    variables: {
      chatId: id || ''
    }
  });

  const chat = useMemo(() => {
    return data?.getChat;
  }, [data?.getChat]);

  const onSendMessage = useCallback(async () => {
    if (!newMessage) {
      return;
    }

    await createMessage({
      variables: {
        text: newMessage,
        userId: chat?.chatWithUser.id || 0
      }
    });
    setNewMessage('');
  }, [chat?.chatWithUser.id, createMessage, newMessage]);

  const messageListener = useCallback(
    (msg: TMessage) => {
      setMessages((prev) => [...prev, { ...msg, isMyMessage: msg.author.id !== chat?.chatWithUser.id }]);
    },
    [chat?.chatWithUser.id]
  );

  useEffect(() => {
    joinRoom(`chat_${id}`);
    socket?.on('message', messageListener);

    return () => {
      socket?.off('message', messageListener);
    };
  }, [id, joinRoom, messageListener, socket]);

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

      <div
        ref={messagesContainerRef}
        className="mt-4 flex max-h-[65vh] flex-col gap-4 overflow-auto"
      >
        {messages.map((message) => (
          <Message
            key={message.id}
            message={message}
          />
        ))}
        <Observer callback={openMessages} />
      </div>

      <AppForm
        className="border-t pt-2"
        onSubmit={onSendMessage}
      >
        <div className="flex items-center gap-4">
          <AppTextarea
            value={newMessage}
            placeholder="Write your message here..."
            rows={3}
            disabled={isCreateMessageInProgress}
            onChange={(e) => setNewMessage(e.target.value)}
          />

          <AppButton
            type="submit"
            disabled={isCreateMessageInProgress}
          >
            <RiSendPlane2Fill size="20" />
          </AppButton>
        </div>
      </AppForm>
    </div>
  );
};

export default Chat;
