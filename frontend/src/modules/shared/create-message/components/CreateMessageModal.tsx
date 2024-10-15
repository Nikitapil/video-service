import Modal from '../../../../components/ui/Modal.tsx';
import { ShowableElement } from '../../../../hooks/useShowElement.tsx';
import AppTextarea from '../../../../components/ui/inputs/AppTextarea.tsx';
import AppCombobox from '../../../../components/ui/inputs/AppCombobox.tsx';
import { useMemo, useState } from 'react';
import { useSearchUsersLazyQuery } from '../../../../gql/graphql.tsx';
import { useDebounce } from '../../../../hooks/useDebounce.ts';
import AppForm from '../../../../components/ui/AppForm.tsx';
import AppButton from '../../../../components/ui/AppButton.tsx';

interface CreateMessageModalProps {
  showElement: ShowableElement;
}

const CreateMessageModal = ({ showElement }: CreateMessageModalProps) => {
  const [user, setUser] = useState<number | null>(null);

  const [getUsers, { data }] = useSearchUsersLazyQuery();

  const usersOptions = useMemo(() => {
    return data?.getUsers.map((item) => ({ value: item.id, text: item.fullname })) || [];
  }, [data?.getUsers]);

  // TODO продолжить с реализации useDebounce
  const onUsersSearch = useDebounce((value: string) => {
    getUsers({
      variables: {
        search: value
      }
    });
  });

  return (
    <Modal showElement={showElement}>
      <AppForm className="flex w-full flex-col items-center">
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
          placeholder="Write your message here..."
          rows={4}
        />

        <div className="mt-5 flex gap-4 self-end">
          <AppButton
            appearance="danger"
            type="button"
            text="Cancel"
            onClick={showElement.close}
          />
          <AppButton text="Send" />
        </div>
      </AppForm>
    </Modal>
  );
};

export default CreateMessageModal;
