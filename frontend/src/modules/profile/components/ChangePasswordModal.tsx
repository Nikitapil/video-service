import { ShowableElement } from '../../../hooks/useShowElement.ts';
import Modal from '../../../components/ui/Modal.tsx';
import { useState } from 'react';
import AppInput from '../../../components/ui/inputs/AppInput.tsx';
import AppButton from '../../../components/ui/AppButton.tsx';
import { useChangePasswordMutation } from '../../../gql/graphql.tsx';

interface ChangePasswordModalProps {
  showElement: ShowableElement;
}

const ChangePasswordModal = ({ showElement }: ChangePasswordModalProps) => {
  const [formValues, setFormValues] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [changePassword, { loading }] = useChangePasswordMutation({
    variables: {
      ...formValues
    }
  });

  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const [errors, setErrors] = useState<Record<string, string>>();

  const onSubmit = async () => {
    try {
      await changePassword();

      showElement.close();
    } catch (err: any) {
      setErrors(err.graphQLErrors?.[0]?.extensions);
    }
  };

  return (
    <Modal showElement={showElement}>
      <h2 className="mb-3 text-center text-xl font-bold">Change password</h2>

      <div className="flex flex-col gap-3">
        <AppInput
          value={formValues.oldPassword}
          placeholder="Your current password"
          label="Current password"
          id="oldPassword"
          type="password"
          error={errors?.oldPassword || ''}
          disabled={loading}
          onChange={onInput}
        />

        <AppInput
          value={formValues.newPassword}
          placeholder="New Password"
          label="New Password"
          id="newPassword"
          type="password"
          error={errors?.newPassword || ''}
          disabled={loading}
          onChange={onInput}
        />

        <AppInput
          value={formValues.confirmPassword}
          placeholder="Confirm New Password"
          label="Confirm Password"
          id="confirmPassword"
          type="password"
          error={errors?.confirmPassword || ''}
          disabled={loading}
          onChange={onInput}
        />
        <div className="flex justify-end gap-3">
          <AppButton
            text="Cancel"
            onClick={showElement.close}
          />

          <AppButton
            text="Submit"
            appearance="danger"
            onClick={onSubmit}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ChangePasswordModal;
