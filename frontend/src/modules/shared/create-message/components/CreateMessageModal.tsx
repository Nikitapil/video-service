import Modal from '../../../../components/ui/Modal.tsx';
import { ShowableElement } from '../../../../hooks/useShowElement.tsx';
import AppTextarea from '../../../../components/ui/inputs/AppTextarea.tsx';
import AppCombobox from '../../../../components/ui/inputs/AppCombobox.tsx';
import { useMemo, useState } from 'react';
import { useSearchUsersLazyQuery } from '../../../../gql/graphql.tsx';
import { useDebounce } from '../../../../hooks/useDebounce.ts';

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
  const onUsersSearch = (value: string) => {
    getUsers({
      variables: {
        search: value
      }
    });
  };

  const testdebounce = useDebounce(() => console.log('debounce'));

  return (
    <Modal showElement={showElement}>
      <div className="flex w-full flex-col items-center">
        <h3 className="text-lg font-semibold">New Message</h3>
        <AppCombobox
          onInputChange={testdebounce}
          value={user}
          setValue={setUser}
          options={usersOptions}
        />
        <AppTextarea
          placeholder="Write your message here..."
          rows={4}
        />
      </div>
    </Modal>
  );
};

export default CreateMessageModal;
