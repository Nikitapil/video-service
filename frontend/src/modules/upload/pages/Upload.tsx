import UploadLayout from '../../../layouts/UploadLayout.tsx';
import { ChangeEvent, DragEvent, useMemo, useState } from 'react';
import { FiUploadCloud } from 'react-icons/fi';
import mobileCase from '../../../assets/images/mobile-case.png';
import { IoCheckmarkDoneCircleOutline } from 'react-icons/io5';
import { GiBoxCutter } from 'react-icons/gi';
import AppInput from '../../../components/ui/inputs/AppInput.tsx';
import { useCreatePostMutation } from '../../../gql/graphql.tsx';
import { useNavigate } from 'react-router-dom';
import { getPostLink } from '../../../router/routes.ts';

const Upload = () => {
  const navigate = useNavigate();

  const [fileData, setFileData] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [caption, setCaption] = useState('');
  const [tags, setTags] = useState<string>('');

  const fileDisplay = useMemo(() => {
    return fileData ? URL.createObjectURL(fileData) : null;
  }, [fileData]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFileData(e.target.files[0]);
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

      <div className="mt-8 gap-6 md:flex">
        {!fileDisplay && (
          <label
            htmlFor="fileInput"
            className="mx-auto mb-6 mt-4 flex h-[470px] w-full max-w-[260px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-3 text-center hover:bg-gray-100 md:mx-0"
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
            onDrop={onDrop}
          >
            <FiUploadCloud
              size={50}
              color="#b3b3b1"
            />

            <div className="mt-4 text-[17px]">Select a video to upload</div>

            <div className="mt-1.5 text-[13px] text-gray-500">Or drag and drop a file</div>

            <div className="mt-12 text-sm text-gray-400">MP4</div>

            <div className="mt-2 text-[13px] text-gray-400">Up to 30 minutes</div>

            <div className="mt-2 text-[13px] text-gray-400">Less than 2 GB</div>

            <div className="mt-8 w-[80%] bg-[#f02c56] px-2 py-1.5 text-[15px] text-white">Select file</div>

            <input
              type="file"
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
            <div className="relative mx-auto mb-16 mt-4 flex h-[540px] w-full max-w-[260px] cursor-pointer items-center justify-center rounded-2xl p-3 md:mx-0 md:mb-12">
              <div className="h-full w-full bg-black" />
              <img
                src={mobileCase}
                alt="mobile case"
                className="pointer-events-none absolute z-20"
              />

              <video
                src={fileDisplay}
                autoPlay
                loop
                muted
                controls
                className="absolute z-10 h-full w-full rounded-xl object-cover p-[13px]"
              />

              <div className="absolute -bottom-12 z-50 flex w-full items-center justify-between rounded-xl border border-gray-300 p-2">
                <div className="flex justify-between truncate">
                  <IoCheckmarkDoneCircleOutline
                    size="16"
                    className="min-w-[16px]"
                  />
                  <div className="truncate text-ellipsis pl-1 text-[11px]">{fileData?.name}</div>
                </div>
                <button
                  className="text-[11px]"
                  onClick={clearVideo}
                >
                  Clear
                </button>
              </div>
            </div>

            <div className="mb-6 mt-4">
              <div className="flex bg-[#f8f8f8] px-6 py-4">
                <GiBoxCutter
                  className="mr-4"
                  size="20"
                />

                <div>
                  <div className="mb-1.5 text-[15px] font-semibold">Divide videos and edit</div>

                  <div className="text-[13px] font-semibold text-gray-400">
                    You can quickly divide videos into multiple clips ad edit them.
                  </div>
                </div>

                <div className="my-auto flex h-full w-full max-w-[130px] justify-end text-center">
                  <button className="rounded-sm bg-[#f02c56] px-8 py-1.5 text-[15px] text-white">Edit</button>
                </div>
              </div>

              <div className="mt-5">
                <div className="mb-1 text-[15px]">Caption</div>
                <div className="text-[12px] text-gray-400">{caption.length}</div>
              </div>

              <input
                className="w-full rounded-md border p-2.5 focus:outline-none"
                type="text"
                maxLength={150}
                value={caption}
                disabled={isUploading}
                onChange={(e) => setCaption(e.target.value)}
              />

              <div className="mt-3">
                <AppInput
                  placeholder="Put some tags here"
                  value={tags}
                  disabled={isUploading}
                  onChange={(e) => setTags(e.target.value)}
                />
              </div>

              <div className="flex gap-3">
                <button
                  className="mt-8 rounded-sm border px-10 py-2.5 text-[16px] transition-all duration-300 hover:bg-gray-100"
                  disabled={isUploading}
                  onClick={discard}
                >
                  Discard
                </button>

                <button
                  className="mt-8 rounded-sm border bg-[#f02c56] px-10 py-2.5 text-[16px] text-white"
                  disabled={isUploading}
                  onClick={handleCreatePost}
                >
                  Post
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </UploadLayout>
  );
};

export default Upload;
