import UserAvatar from './UserAvatar.tsx';
import { BsFillPencilFill } from 'react-icons/bs';
import { ChangeEvent, useMemo, useRef, useState } from 'react';
import { Cropper, ReactCropperElement } from 'react-cropper';
import AppButton from '../../../components/ui/AppButton.tsx';
import { getImageFileFromCanvas } from '../../../utils/files.ts';

interface AvatarUploaderProps {
  initialImageSrc: string;
  loading: boolean;
  setAvatarFile: (file: File | null) => void;
}

const AvatarUploader = ({ initialImageSrc, loading, setAvatarFile }: AvatarUploaderProps) => {
  const cropperRef = useRef<ReactCropperElement>(null);

  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const imgSrc = useMemo(() => {
    return croppedImage || initialImageSrc;
  }, [croppedImage, initialImageSrc]);

  const onImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    setCroppedImage(null);

    if (e.target.files) {
      setUploadedImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const saveCroppedImage = async () => {
    const cropper = cropperRef.current?.cropper;

    if (cropper) {
      const canvas = cropper.getCroppedCanvas();
      const croppeedImageUrl = canvas.toDataURL();
      const file = await getImageFileFromCanvas(canvas, 'profile.jpg');
      setAvatarFile(file);
      setUploadedImage(null);
      setCroppedImage(croppeedImageUrl);
    }
  };

  return (
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

      {uploadedImage && (
        <div className="absolute left-0 top-20 z-50 h-full w-full bg-white">
          <Cropper
            ref={cropperRef}
            style={{ height: '80%', width: '100%' }}
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
          <div className="ml-auto mt-2 max-w-fit">
            <AppButton
              text="Save image"
              appearance="danger"
              onClick={saveCroppedImage}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default AvatarUploader;
