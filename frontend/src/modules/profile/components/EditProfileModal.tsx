import 'cropperjs/dist/cropper.css';
import { ChangeEvent, useMemo, useRef, useState } from 'react';
import { useUserStore } from '../../shared/auth/stores/userStore.ts';
import { Cropper, ReactCropperElement } from 'react-cropper';
import { BsFillPencilFill } from 'react-icons/bs';
import AppInput from '../../../components/ui/inputs/AppInput.tsx';
import UserAvatar from '../../shared/components/UserAvatar.tsx';
import { ShowableElement } from '../../../hooks/useShowElement.ts';
import { UpdateUserProfileMutationVariables, useUpdateUserProfileMutation } from '../../../gql/graphql.tsx';
import { getImageFileFromCanvas } from '../../../utils/files.ts';
import Modal from '../../../components/ui/Modal.tsx';
import AppTextarea from '../../../components/ui/inputs/AppTextarea.tsx';
import AppButton from '../../../components/ui/AppButton.tsx';

interface EditProfileModalProps {
  showElement: ShowableElement;
}

const EditProfileModal = ({ showElement }: EditProfileModalProps) => {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  const [uploadedImage, setUploadedImage] = useState<string | undefined>();
  const [croppedImage, setCroppedImage] = useState<string | undefined>();

  const [username, setUsername] = useState<string>(user?.fullname || '');
  const [bio, setBio] = useState<string>(user?.bio ?? '');
  const [email, setEmail] = useState<string>(user?.email ?? '');

  const [errors, setErrors] = useState<Record<string, string>>();

  const [croppingDone, setCroppingDone] = useState<boolean>(false);
  const cropperRef = useRef<ReactCropperElement>(null);

  const imgSrc = useMemo(() => {
    return croppedImage ?? user?.image;
  }, [user, croppedImage]);

  const isReadyToApply = useMemo(() => {
    return !uploadedImage || croppingDone;
  }, [croppingDone, uploadedImage]);

  const [updateUserProfile, { loading }] = useUpdateUserProfileMutation();

  const onImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    setCroppedImage(undefined);

    if (e.target.files) {
      setUploadedImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const saveCroppedImage = () => {
    const cropper = cropperRef.current?.cropper;

    if (cropper) {
      const croppeedImageUrl = cropper.getCroppedCanvas().toDataURL();
      setUploadedImage(croppeedImageUrl);
      setCroppedImage(croppeedImageUrl);
      setCroppingDone(true);
    }
  };

  const updateProfile = async () => {
    setErrors({});

    const cropper = cropperRef.current?.cropper;
    const input: UpdateUserProfileMutationVariables = {
      fullname: username,
      bio: bio,
      image: null,
      email: email
    };

    if (cropper) {
      input.image = await getImageFileFromCanvas(cropper.getCroppedCanvas(), 'profile.jpg');
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

  const onUpdate = async () => {
    setCroppingDone(false);
    await updateProfile();
  };

  const onSubmit = () => {
    if (isReadyToApply) {
      onUpdate();
    } else {
      saveCroppedImage();
    }
  };

  return (
    <Modal
      showElement={showElement}
      preventClose={loading}
    >
      <div className="relative pb-20">
        <h2 className="w-full border-b border-b-gray-300 py-4 text-2xl font-medium">Edit Profile</h2>

        <div className="max-h-[65vh] overflow-auto">
          <section className="flex w-full flex-col border-b py-4">
            <h3 className="mb-1.5 text-center font-semibold text-gray-700">Profile photo</h3>

            <div className="flex items-center justify-center">
              <label
                htmlFor="image"
                className="relative cursor-pointer"
              >
                <UserAvatar
                  image={imgSrc}
                  className="img-preview !w-20 object-cover"
                />

                <div className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 bg-white p-1.5 shadow-xl">
                  <BsFillPencilFill
                    size="17"
                    className="mx-auto"
                  />
                </div>
              </label>

              <input
                id="image"
                className="hidden"
                disabled={loading}
                type="file"
                accept="image/*"
                onChange={onImageUpload}
              />
            </div>
          </section>

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
                  cols={30}
                  rows={2}
                  maxLength={80}
                  value={bio}
                  disabled={loading}
                  error={errors?.bio || ''}
                  onChange={(e) => setBio(e.target.value)}
                ></AppTextarea>

                <div className="text-right text-xs text-gray-500">{bio.length}/80</div>
              </div>
            </div>
          </section>
        </div>

        {uploadedImage && !croppedImage && (
          <div className="absolute left-0 top-20 h-3/4 w-full">
            <Cropper
              ref={cropperRef}
              style={{ height: '100%', width: '100%' }}
              src={uploadedImage}
              guides={true}
              initialAspectRatio={1}
              aspectRatio={1}
              viewMode={1}
              minCropBoxHeight={10}
              minCropBoxWidth={10}
              background={true}
              responsive={true}
              preview=".img-preview"
            />
          </div>
        )}

        <section className="absolute bottom-0 w-full border-t border-t-gray-300 bg-white p-5">
          <div className="flex items-center justify-end gap-4">
            <AppButton
              text="Cancel"
              disabled={loading}
              onClick={showElement.close}
            />

            <AppButton
              text={isReadyToApply ? 'Apply' : 'Save crop'}
              disabled={loading}
              appearance="danger"
              onClick={onSubmit}
            />
          </div>
        </section>
      </div>
    </Modal>
  );
};

export default EditProfileModal;
