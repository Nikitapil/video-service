import { ImCross } from 'react-icons/im';
import { ReactNode, useCallback } from 'react';
import { ShowableElement } from '../../hooks/useShowElement.tsx';

interface ModalProps {
  showElement: ShowableElement;
  preventClose?: boolean;
  children: ReactNode;
}

const Modal = ({ showElement, preventClose, children }: ModalProps) => {
  const close = useCallback(() => {
    if (!preventClose) {
      showElement.close();
    }
  }, [preventClose, showElement]);

  if (!showElement.isShowed) {
    return null;
  }

  return (
    <>
      <div
        className="fixed left-0 top-0 z-30 h-screen w-full bg-black opacity-80"
        role="dialog"
        onClick={close}
      ></div>

      <div className="fixed left-1/2 top-1/2 z-40 min-h-24 min-w-[max(50vw,320px)] max-w-[90vw] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6">
        {!preventClose && (
          <button
            className="absolute right-2 top-2 text-gray-700 common-transition hover:text-black"
            tabIndex={0}
            onClick={close}
          >
            <ImCross />
          </button>
        )}

        <div className="max-h-[85vh] overflow-auto">{children}</div>
      </div>
    </>
  );
};

export default Modal;
