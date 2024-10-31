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

  const [croppingDone, setCroppingDone] = useState<boolean>(false);
  const cropperRef = useRef<ReactCropperElement>(null);

  const imgSrc = useMemo(() => {
    return croppedImage ?? user?.image;
  }, [user, croppedImage]);

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
    const cropper = cropperRef.current?.cropper;
    const input: UpdateUserProfileMutationVariables = {
      fullname: username,
      bio: bio,
      image: null
    };

    if (cropper) {
      input.image = await getImageFileFromCanvas(cropper.getCroppedCanvas(), 'profile.jpg');
    }

    const response = await updateUserProfile({
      variables: {
        ...input
      }
    });

    setUser(response.data?.updateUser || null);

    showElement.close();
  };

  const onUpdate = async () => {
    setCroppingDone(false);
    await updateProfile();
  };

  return (
    <Modal
      showElement={showElement}
      preventClose={loading}
    >
      <h2 className="w-full border-b border-b-gray-300 py-4 text-2xl font-medium">Edit Profile</h2>

      <div>
        <div className="flex w-full flex-col border-b py-4">
          <h3 className="mb-1.5 text-center font-semibold text-gray-700">Profile photo</h3>

          <div className="flex items-center justify-center">
            <label
              htmlFor="image"
              className="relative cursor-pointer"
            >
              <UserAvatar
                image={imgSrc}
                className="img-preview w-20 object-cover"
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
              type="file"
              accept="image/*"
              onChange={onImageUpload}
            />
          </div>
        </div>

        <div className="mt-1.5 flex w-full flex-col border-b px-1.5 py-2">
          <div className="mb-1 text-center text-[15px] font-semibold text-gray-700 sm:mx-auto sm:mb-0 sm:w-[160px]">
            Username
          </div>

          <div className="flex items-center justify-center">
            <div className="w-full max-w-md sm:w-[60%]">
              <AppInput
                value={username}
                placeholder="Username"
                max={30}
                error=""
                onChange={(e) => setUsername(e.target.value)}
              />

              <div className="mt-4 text-center text-[11px] text-gray-500">
                Username can only contain letters, numbers, underscores. Changing your username will also change your
                profile link.
              </div>
            </div>
          </div>
        </div>

        <div className="mt-1.5 flex w-full flex-col border-b px-1.5 py-2">
          <div className="mb-1 text-center text-[15px] font-semibold text-gray-700 sm:mx-auto sm:mb-0 sm:w-[160px]">
            Bio
          </div>

          <div className="flex items-center justify-center">
            <div className="w-full max-w-md sm:w-[60%]">
              <textarea
                className="w-full resize-none rounded-md border border-gray-300 bg-[#f1f1f2] px-3 py-2.5 text-gray-800 outline-none"
                cols={30}
                rows={4}
                maxLength={80}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              ></textarea>

              <div className="text-right text-[11px] text-gray-500">{bio.length}/80</div>
            </div>
          </div>
        </div>
      </div>

      {uploadedImage && !croppedImage && (
        <div className="absolute left-0 top-20 h-[430px] w-full">
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

      <div className="bottom-0 left-0 w-full border-t border-t-gray-300 p-5">
        <div className="flex items-center justify-end">
          <button
            className="flex items-center rounded-sm border px-3 py-[6px] transition-all duration-300 hover:bg-gray-100"
            onClick={showElement.close}
          >
            <span className="px-2 text-[15px] font-medium">Cancel</span>
          </button>
          {!uploadedImage || croppingDone ? (
            <button
              className="ml-3 flex items-center rounded-md border bg-[#f02c56] px-3 py-[6px] text-white"
              onClick={onUpdate}
            >
              <span className="mx-4 text-[15px] font-medium">Apply</span>
            </button>
          ) : (
            <button
              className="ml-3 flex items-center rounded-md border bg-[#f02c56] px-3 py-[6px] text-white"
              onClick={saveCroppedImage}
            >
              <span className="mx-4 text-[15px] font-medium">Save crop</span>
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default EditProfileModal;
