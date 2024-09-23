import 'cropperjs/dist/cropper.css';
import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import { useUserStore } from '../../shared/auth/stores/userStore.ts';
import { useGeneralStore } from '../../shared/stores/generalStore.ts';
import { Cropper, ReactCropperElement } from 'react-cropper';
import { useMutation } from '@apollo/client';
import { UPDATE_PROFILE } from '../mutations/UpdateUserProfile.ts';
import { UpdateUserProfileMutation, UpdateUserProfileMutationVariables } from '../../../gql/graphql.ts';
import { AiOutlineClose } from 'react-icons/ai';
import { BsFillPencilFill } from 'react-icons/bs';
import AppInput from '../../../components/ui/AppInput.tsx';
import UserAvatar from '../../shared/components/UserAvatar.tsx';

const EditProfileModal = () => {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const setIsEditProfileOpen = useGeneralStore((state) => state.setIsEditProfileOpen);

  const [isUpdated, setIsUpdated] = useState<boolean>(false);

  const [uploadedImage, setUploadedImage] = useState<string | undefined>();
  const [croppedImage, setCroppedImage] = useState<string | undefined>();

  const [file, setFile] = useState<File | null>();
  const [username, setUsername] = useState<string>(user?.fullname || '');
  const [bio, setBio] = useState<string>(user?.bio ?? '');

  const [croppingDone, setCroppingDone] = useState<boolean>(false);
  const cropperRef = useRef<ReactCropperElement>(null);

  const imgSrc = useMemo(() => {
    return croppedImage ?? user?.image;
  }, [user, croppedImage]);

  const [updateUserProfile] = useMutation<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>(
    UPDATE_PROFILE
  );

  const getUploadedImage = (e: ChangeEvent<HTMLInputElement>) => {
    setCroppedImage(undefined);
    if (e.target.files) {
      setUploadedImage(URL.createObjectURL(e.target.files[0]));
      setFile(e.target.files[0]);
    }
  };

  const saveCroppedImage = () => {
    const cropper = cropperRef.current?.cropper;

    setCroppingDone(true);

    if (cropper) {
      const croppeedImageUrl = cropper.getCroppedCanvas().toDataURL();
      setUploadedImage(croppeedImageUrl);
      setCroppedImage(croppeedImageUrl);
    }
  };

  const updateProfile = async () => {
    const cropper = cropperRef.current?.cropper;
    const input: { fullname: string; bio: string; image: File | null } = { fullname: username, bio: bio, image: null };

    if (cropper) {
      await new Promise((resolve) => {
        cropper.getCroppedCanvas().toBlob(async (blob) => {
          if (blob) {
            input.image = new File([blob], 'profile.jpg', { type: 'image/jpg' });
            resolve(true);
          }
        });
      });
    }

    const response = await updateUserProfile({
      variables: {
        ...input
      }
    });

    setUser(response.data?.updateUser || null);

    setIsEditProfileOpen();
  };

  const cropAndUpdateImage = async () => {
    setCroppingDone(false);
    await updateProfile();
  };

  useEffect(() => {
    if (username.length > 0 || bio.length > 0) {
      setIsUpdated(true);
    } else {
      setIsUpdated(false);
    }
  }, [username, bio]);

  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full justify-center overflow-auto bg-black bg-opacity-50 pt-5">
      <div className="relative mx-3 mb-10 h-fit w-full max-w-[700px] rounded-lg bg-white p-4">
        <div className="absolute left-0 flex w-full items-center justify-between border-b border-b-gray-300 p-5">
          <div className="text-[22px] font-medium">Edit Profile</div>
          <button onClick={() => setIsEditProfileOpen()}>
            <AiOutlineClose size="25" />
          </button>
        </div>

        <div className="mt-16">
          <div className="flex h-[160px] w-full flex-col border-b px-1.5 py-4 sm:h-[145px] sm:py-7">
            <div className="mb-1 text-center text-[15px] font-semibold text-gray-700 sm:mx-auto sm:mb-0 sm:w-[160px]">
              Profile photo
            </div>

            <div className="flex items-center justify-center">
              <label
                htmlFor="image"
                className="relative cursor-pointer"
              >
                <UserAvatar
                  image={imgSrc}
                  className="img-preview !w-20 object-cover"
                />

                <div className="absolute bottom-0 right-0 flex h-[32px] w-[32px] items-center justify-center rounded-full border border-gray-300 bg-white p-1 shadow-xl">
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
                onChange={getUploadedImage}
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
              onClick={setIsEditProfileOpen}
            >
              <span className="px-2 text-[15px] font-medium">Cancel</span>
            </button>
            {!uploadedImage || croppingDone ? (
              <button
                className="ml-3 flex items-center rounded-md border bg-[#f02c56] px-3 py-[6px] text-white"
                onClick={cropAndUpdateImage}
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
      </div>
    </div>
  );
};

export default EditProfileModal;
