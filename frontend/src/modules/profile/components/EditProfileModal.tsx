import 'cropperjs/dist/cropper.css';
import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import { useUserStore } from '../../shared/auth/stores/userStore.ts';
import { useGeneralStore } from '../../shared/stores/generalStore.ts';
import { Cropper, ReactCropperElement } from 'react-cropper';
import { useMutation } from '@apollo/client';
import { UPDATE_PROFILE } from '../mutations/UpdateUserProfile.ts';
import { UpdateUserProfileMutation, UpdateUserProfileMutationVariables } from '../../../gql/graphql.ts';
import { AiOutlineClose } from 'react-icons/ai';
import avatarPlaceholder from '../../../assets/images/avatar-placeholder.png';
import { BsFillPencilFill } from 'react-icons/bs';
import AppInput from '../../../components/ui/AppInput.tsx';

const EditProfileModal = () => {
  const user = useUserStore();
  const setUser = useUserStore((state) => state.setUser);
  const setIsEditProfileOpen = useGeneralStore((state) => state.setIsEditProfileOpen);

  const [isUpdated, setIsUpdated] = useState<boolean>(false);

  const [uploadedImage, setUploadedImage] = useState<string | undefined>();
  const [croppedImage, setCroppedImage] = useState<string | undefined>();

  const [file, setFile] = useState<File | null>();
  const [username, setUsername] = useState<string>(user.fullname);
  const [bio, setBio] = useState<string>(user.bio ?? '');

  const [croppingDone, setCroppingDone] = useState<boolean>(false);
  const cropperRef = useRef<ReactCropperElement>(null);

  const imgSrc = useMemo(() => {
    return croppedImage ?? (user.image || avatarPlaceholder);
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

    setUser({
      id: response.data?.updateUser.id || null,
      fullname: response.data?.updateUser.fullname || '',
      bio: response.data?.updateUser.bio || '',
      image: response.data?.updateUser.image || ''
    });

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
    <div className="fixed flex justify-center pt-5 z-50 top-0 left-0 w-full h-full bg-black bg-opacity-50 overflow-auto">
      <div className="max-w-[700px] mx-3 p-4 rounded-lg mb-10 relative bg-white w-full h-fit">
        <div className="justify-between w-full p-5 left-0 border-b border-b-gray-300 absolute flex items-center">
          <div className="text-[22px] font-medium">Edit Profile</div>
          <button onClick={() => setIsEditProfileOpen()}>
            <AiOutlineClose size="25" />
          </button>
        </div>

        <div className="mt-16">
          <div className="flex flex-col border-b sm:h-[145px] h-[160px] px-1.5 sm:py-7 py-4 w-full">
            <div className="font-semibold text-[15px] sm:mb-0 mb-1 text-gray-700 sm:w-[160px] sm:mx-auto text-center">
              Profile photo
            </div>

            <div className="flex items-center justify-center">
              <label
                htmlFor="image"
                className="relative cursor-pointer"
              >
                <img
                  src={imgSrc}
                  alt="avatar"
                  className="rounded-full img-preview object-cover w-20 h-20"
                />

                <div className="absolute bottom-0 right-0 rounded-full flex items-center justify-center bg-white shadow-xl border border-gray-300 p-1 w-[32px] h-[32px]">
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

          <div className="flex flex-col border-b px-1.5 py-2 mt-1.5 w-full">
            <div className="font-semibold text-[15px] sm:mb-0 mb-1 text-gray-700 sm:w-[160px] sm:mx-auto text-center">
              Username
            </div>

            <div className="flex items-center justify-center">
              <div className="sm:w-[60%] w-full max-w-md">
                <AppInput
                  value={username}
                  placeholder="Username"
                  max={30}
                  error=""
                  onChange={(e) => setUsername(e.target.value)}
                />

                <div className="text-[11px] text-gray-500 mt-4 text-center">
                  Username can only contain letters, numbers, underscores. Changing your username will also change your
                  profile link.
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col border-b px-1.5 py-2 mt-1.5 w-full">
            <div className="font-semibold text-[15px] sm:mb-0 mb-1 text-gray-700 sm:w-[160px] sm:mx-auto text-center">
              Bio
            </div>

            <div className="flex items-center justify-center">
              <div className="sm:w-[60%] w-full max-w-md">
                <textarea
                  className="resize-none w-full bg-[#f1f1f2] text-gray-800 border border-gray-300 rounded-md py-2.5 px-3 outline-none"
                  cols={30}
                  rows={4}
                  maxLength={80}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                ></textarea>

                <div className="text-[11px] text-gray-500 text-right">{bio.length}/80</div>
              </div>
            </div>
          </div>
        </div>

        {uploadedImage && !croppedImage && (
          <div className="w-full h-[430px] absolute top-20 left-0">
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

        <div className="p-5 left-0 bottom-0 border-t border-t-gray-300 w-full">
          <div className="flex items-center justify-end">
            <button
              className="flex items-center border rounded-sm px-3 py-[6px] hover:bg-gray-100 transition-all duration-300"
              onClick={setIsEditProfileOpen}
            >
              <span className="px-2 font-medium text-[15px]">Cancel</span>
            </button>
            {!uploadedImage || croppingDone ? (
              <button
                className="flex items-center bg-[#f02c56] text-white border rounded-md ml-3 px-3 py-[6px]"
                onClick={cropAndUpdateImage}
              >
                <span className="mx-4 font-medium text-[15px]">Apply</span>
              </button>
            ) : (
              <button
                className="flex items-center bg-[#f02c56] text-white border rounded-md ml-3 px-3 py-[6px]"
                onClick={saveCroppedImage}
              >
                <span className="mx-4 font-medium text-[15px]">Save crop</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
