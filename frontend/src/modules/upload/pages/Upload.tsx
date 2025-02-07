import UploadLayout from '../../../layouts/UploadLayout.tsx';
import { ChangeEvent, DragEvent, useMemo, useState } from 'react';
import { FiUploadCloud } from 'react-icons/fi';
import mobileCase from '../../../assets/images/mobile-case.png';
import { GiCheckMark } from 'react-icons/gi';
import AppInput from '../../../components/ui/inputs/AppInput.tsx';
import { useCreatePostMutation } from '../../../gql/graphql.tsx';
import { useNavigate } from 'react-router-dom';
import { getPostLink } from '../../../router/routes.ts';
import AppButton from '../../../components/ui/AppButton.tsx';

const Upload = () => {
  const navigate = useNavigate();

  const [fileData, setFileData] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [caption, setCaption] = useState('');
  const [tags, setTags] = useState<string>('');

  const isSubmitBtnDisabled = useMemo(() => {
    return isUploading || !caption;
  }, [isUploading, caption]);

  const fileDisplay = useMemo(() => {
    return fileData ? URL.createObjectURL(fileData) : null;
  }, [fileData]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const sizeInGb = file.size / 1024 / 1024 / 1024;
      if (sizeInGb < 2) {
        setFileData(e.target.files[0]);
      }
    }
  };

  const [createPost] = useCreatePostMutation({
    variables: {
      text: caption,
      video: fileData,
      tags
    }
  });

  const onDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file?.type !== 'video/mp4') {
      return;
    }
    setFileData(file);
  };

  const clearVideo = () => {
    setFileData(null);
  };

  const discard = () => {
    clearVideo();
    setCaption('');
  };

  const handleCreatePost = async () => {
    setIsUploading(true);
    const { data } = await createPost();
    setIsUploading(false);
    discard();
    if (data?.createPost) {
      navigate(getPostLink(data.createPost.id));
    }
  };

  return (
    <UploadLayout>
      <h2 className="text-2xl font-semibold">Upload video</h2>

      <div className="mt-1 text-gray-400">Post a video to your account</div>

      <div className="mt-6 gap-6 md:flex">
        {!fileDisplay && (
          <label
            htmlFor="fileInput"
            data-testid="video-uploader"
            className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 px-9 py-20 common-transition hover:bg-gray-100"
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
            onDrop={onDrop}
          >
            <FiUploadCloud
              className="text-gray-500"
              size={50}
            />

            <p className="mt-4 text-lg">Select a video to upload</p>

            <p className="mt-1.5 text-sm text-gray-500">Or drag and drop a file</p>

            <p className="mt-12 text-sm text-gray-400">MP4</p>

            <p className="mt-2 text-sm text-gray-400">Up to 30 minutes</p>

            <p className="mt-2 text-sm text-gray-400">Less than 2 GB</p>

            <div className="mt-8 w-full rounded-md bg-red-500 px-2 py-1.5 text-center text-white">Select file</div>

            <input
              type="file"
              data-testid="upload-input"
              id="fileInput"
              className="hidden"
              accept="video/mp4"
              disabled={isUploading}
              onChange={handleFileChange}
            />
          </label>
        )}

        {fileDisplay && (
          <>
            <figure
              className="mx-auto p-3 md:mx-0 md:mb-12"
              data-testid="upload-form"
            >
              <div className="relative mb-2 h-140 w-64 cursor-pointer rounded-2xl">
                <img
                  src={mobileCase}
                  alt="mobile case"
                  className="pointer-events-none relative z-20 h-full"
                />

                <video
                  src={fileDisplay}
                  autoPlay
                  loop
                  muted
                  controls
                  className="absolute top-0 z-10 h-full w-full rounded-xl object-cover p-3"
                />
              </div>

              <figcaption className="flex w-full items-center justify-between rounded-xl border border-gray-300 p-2">
                <div className="flex justify-between truncate">
                  <GiCheckMark size="16" />
                  <p className="ml-1 truncate text-ellipsis text-xs">{fileData?.name}</p>
                </div>

                <AppButton
                  appearance="transparentDanger"
                  data-testid="clear-video-button"
                  size="sm"
                  onClick={clearVideo}
                >
                  Clear
                </AppButton>
              </figcaption>
            </figure>

            <div className="mb-6 mt-4 w-full">
              <AppInput
                id="caption"
                data-testid="caption-input"
                label="Caption:"
                placeholder="Caption..."
                type="text"
                max={150}
                value={caption}
                disabled={isUploading}
                onChange={(e) => setCaption(e.target.value)}
              />

              <div className="mb-4">
                <AppInput
                  id="tags"
                  data-testid="tags-input"
                  label="Tags:"
                  placeholder="Put some tags here"
                  value={tags}
                  disabled={isUploading}
                  onChange={(e) => setTags(e.target.value)}
                />
              </div>

              <div className="ml-auto flex w-fit gap-3">
                <AppButton
                  data-testid="discard-button"
                  disabled={isUploading}
                  onClick={discard}
                >
                  Discard
                </AppButton>

                <AppButton
                  appearance="danger"
                  data-testid="create-button"
                  disabled={isSubmitBtnDisabled}
                  onClick={handleCreatePost}
                >
                  Post
                </AppButton>
              </div>
            </div>
          </>
        )}
      </div>
    </UploadLayout>
  );
};

export default Upload;
