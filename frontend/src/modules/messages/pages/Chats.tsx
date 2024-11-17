import { useGetChatsListQuery } from '../../../gql/graphql.tsx';
import ChatList from '../components/ChatList.tsx';
import AppButton from '../../../components/ui/AppButton.tsx';
import CreateMessageModal from '../../shared/create-message/components/CreateMessageModal.tsx';
import { useShowElement } from '../../../hooks/useShowElement.ts';

const Chats = () => {
  const { data, loading } = useGetChatsListQuery();

  const createMessageModalShowElement = useShowElement();

  return (
    <div>
      <section className="mb-4 flex items-center border-b border-gray-300 p-3">
        <h2 className="flex-1 text-lg font-semibold">Your chat list</h2>

        <div className="border-l border-gray-300 px-2">
          <AppButton
            text="Create message"
            size="sm"
            appearance="danger"
            onClick={createMessageModalShowElement.open}
          />
        </div>

        <CreateMessageModal showElement={createMessageModalShowElement} />
      </section>

      <ChatList
        chats={data?.getChatList || []}
        isLoading={loading}
      />
    </div>
  );
};

export default Chats;
