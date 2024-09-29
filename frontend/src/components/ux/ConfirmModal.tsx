import { ShowableElement } from '../../hooks/useShowElement.tsx';
import Modal from '../ui/Modal.tsx';
import AppButton from '../ui/AppButton.tsx';

interface ConfirmModalProps {
  showElement: ShowableElement;
  title: string;
  onConfirm: () => void;
}

const ConfirmModal = ({ showElement, title, onConfirm }: ConfirmModalProps) => {
  return (
    <Modal showElement={showElement}>
      <h3 className="mb-5 text-xl font-semibold">{title}</h3>

      <div className="flex w-full justify-end gap-2">
        <AppButton
          text="Cancel"
          onClick={showElement.close}
          appearance="danger"
        />
        <AppButton
          text="Confirm"
          onClick={onConfirm}
        />
      </div>
    </Modal>
  );
};

export default ConfirmModal;
