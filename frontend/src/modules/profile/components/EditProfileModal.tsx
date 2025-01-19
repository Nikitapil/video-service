import 'cropperjs/dist/cropper.css';
import { useState } from 'react';
import { useUserStore } from '../../shared/auth/stores/userStore.ts';
import AppInput from '../../../components/ui/inputs/AppInput.tsx';
import { ShowableElement } from '../../../hooks/useShowElement.ts';
import { UpdateUserProfileMutationVariables, useUpdateUserProfileMutation } from '../../../gql/graphql.tsx';
import Modal from '../../../components/ui/Modal.tsx';
import AppTextarea from '../../../components/ui/inputs/AppTextarea.tsx';
import AppButton from '../../../components/ui/AppButton.tsx';
import AvatarUploader from '../../shared/components/AvatarUploader.tsx';

interface EditProfileModalProps {
  showElement: ShowableElement;
}

const EditProfileModal = ({ showElement }: EditProfileModalProps) => {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [username, setUsername] = useState<string>(user?.fullname || '');
  const [bio, setBio] = useState<string>(user?.bio ?? '');
  const [email, setEmail] = useState<string>(user?.email ?? '');

  const [errors, setErrors] = useState<Record<string, string>>();

  const [updateUserProfile, { loading }] = useUpdateUserProfileMutation();

  const updateProfile = async () => {
    setErrors({});

    const input: UpdateUserProfileMutationVariables = {
      fullname: username,
      bio: bio,
      email: email
    };

    if (avatarFile) {
      input.image = avatarFile;
    }

    try {
      const response = await updateUserProfile({
        variables: {
          ...input
        }
      });

      setUser(response.data?.updateUser || null);

      showElement.close();
    } catch (err: any) {
      setErrors(err.graphQLErrors?.[0]?.extensions);
    }
  };

  const onSubmit = () => {
    updateProfile();
  };

  return (
    <Modal
      showElement={showElement}
      preventClose={loading}
    >
      <div
        className="relative pb-20"
        data-testid="edit-profile-modal"
      >
        <h2 className="w-full border-b border-b-gray-300 py-4 text-2xl font-medium">Edit Profile</h2>
        <div className="max-h-[65vh] overflow-auto">
          <AvatarUploader
            initialImageSrc={user?.image || ''}
            loading={loading}
            setAvatarFile={setAvatarFile}
          />

          <section className="flex w-full flex-col border-b px-1.5 py-5">
            <label
              htmlFor="username"
              className="mb-1.5 cursor-pointer text-center font-semibold text-gray-700"
            >
              Username
            </label>

            <div className="flex items-center justify-center">
              <div className="w-full max-w-md">
                <AppInput
                  value={username}
                  placeholder="Username"
                  id="username"
                  data-testid="username-input"
                  max={30}
                  error={errors?.fullname || ''}
                  disabled={loading}
                  onChange={(e) => setUsername(e.target.value)}
                />

                <p className="mt-2 text-center text-xs text-gray-500">
                  Username can only contain letters, numbers, underscores.
                </p>
              </div>
            </div>
          </section>

          <section className="flex w-full flex-col border-b px-1.5 py-5">
            <label
              htmlFor="email"
              className="mb-1.5 cursor-pointer text-center font-semibold text-gray-700"
            >
              Email
            </label>

            <div className="flex items-center justify-center">
              <div className="w-full max-w-md">
                <AppInput
                  value={email}
                  placeholder="Email"
                  id="email"
                  data-testid="email-input"
                  max={30}
                  error={errors?.email || ''}
                  disabled={loading}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
          </section>

          <section className="flex w-full flex-col px-1.5 py-5">
            <label
              htmlFor="bio"
              className="mb-1.5 cursor-pointer text-center font-semibold text-gray-700"
            >
              Bio
            </label>

            <div className="flex items-center justify-center">
              <div className="w-full max-w-md">
                <AppTextarea
                  id="bio"
                  data-testid="bio-input"
                  cols={30}
                  rows={2}
                  maxLength={80}
                  value={bio}
                  disabled={loading}
                  error={errors?.bio || ''}
                  onChange={(e) => setBio(e.target.value)}
                ></AppTextarea>
              </div>
            </div>
          </section>
        </div>

        <section className="absolute bottom-0 w-full border-t border-t-gray-300 bg-white p-5">
          <div className="flex items-center justify-end gap-4">
            <AppButton
              text="Cancel"
              disabled={loading}
              onClick={showElement.close}
            />

            <AppButton
              text="Save"
              disabled={loading}
              appearance="danger"
              data-testid="save-button"
              onClick={onSubmit}
            />
          </div>
        </section>
      </div>
    </Modal>
  );
};

export default EditProfileModal;
