import Modal from '../../../../components/ui/Modal.tsx';
import { ShowableElement } from '../../../../hooks/useShowElement.tsx';
import AppTextarea from '../../../../components/ui/inputs/AppTextarea.tsx';
import AppCombobox from '../../../../components/ui/inputs/AppCombobox.tsx';
import { useCallback, useMemo, useState } from 'react';
import { useCreateMessageMutation, useSearchUsersLazyQuery } from '../../../../gql/graphql.tsx';
import { useDebounce } from '../../../../hooks/useDebounce.ts';
import AppForm from '../../../../components/ui/AppForm.tsx';
import AppButton from '../../../../components/ui/AppButton.tsx';
import { useNavigate } from 'react-router-dom';
import { getChatUrl } from '../../../../router/routes.ts';

interface CreateMessageModalProps {
  showElement: ShowableElement;
}

const CreateMessageModal = ({ showElement }: CreateMessageModalProps) => {
  const navigate = useNavigate();

  const [user, setUser] = useState<number | null>(null);
  const [message, setMessage] = useState('');

  const [getUsers, { data }] = useSearchUsersLazyQuery();
  const [createMessage, { loading }] = useCreateMessageMutation();

  const usersOptions = useMemo(() => {
    return data?.getUsers.map((item) => ({ value: item.id, text: item.fullname })) || [];
  }, [data?.getUsers]);

  const isCreateButtonDisabled = useMemo(() => loading || !user || !message, [loading, message, user]);

  const onUsersSearch = useDebounce((value: string) => {
    getUsers({
      variables: {
        search: value
      }
    });
  });

  const onSubmit = useCallback(async () => {
    if (user && message) {
      const { data } = await createMessage({
        variables: {
          userId: user,
          text: message
        }
      });

      const chatId = data?.createMessage?.chatId;

      if (chatId) {
        navigate(getChatUrl(chatId));
      }
    }
  }, [createMessage, message, navigate, user]);

  return (
    <Modal showElement={showElement}>
      <AppForm
        className="flex w-full flex-col items-center"
        onSubmit={onSubmit}
      >
        <h3 className="text-lg font-semibold">New Message</h3>

        <div className="mb-5 w-full">
          <AppCombobox
            onInputChange={onUsersSearch}
            value={user}
            setValue={setUser}
            options={usersOptions}
            placeholder="Find user"
          />
        </div>

        <AppTextarea
          value={message}
          placeholder="Write your message here..."
          rows={4}
          disabled={loading}
          onChange={(e) => setMessage(e.target.value)}
        />

        <div className="mt-5 flex gap-4 self-end">
          <AppButton
            appearance="danger"
            type="button"
            text="Cancel"
            disabled={loading}
            onClick={showElement.close}
          />
          <AppButton
            text="Send"
            type="submit"
            disabled={isCreateButtonDisabled}
          />
        </div>
      </AppForm>
    </Modal>
  );
};

export default CreateMessageModal;
