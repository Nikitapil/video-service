import Modal from '../../../../components/ui/Modal.tsx';
import { ShowableElement } from '../../../../hooks/useShowElement.tsx';
import AppTextarea from '../../../../components/ui/inputs/AppTextarea.tsx';
import AppCombobox from '../../../../components/ui/inputs/AppCombobox.tsx';
import { useState } from 'react';

interface CreateMessageModalProps {
  showElement: ShowableElement;
}

const CreateMessageModal = ({ showElement }: CreateMessageModalProps) => {
  const [user, setUser] = useState<number | null>(null);
  return (
    <Modal showElement={showElement}>
      <div className="flex w-full flex-col items-center">
        <h3 className="text-lg font-semibold">New Message</h3>
        <AppCombobox
          onInputChange={() => {}}
          value={user}
          setValue={setUser}
          options={[
            { value: 1, text: 'Nikita' },
            { value: 2, text: 'Nadia' }
          ]}
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
