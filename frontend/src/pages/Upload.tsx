import UploadLayout from "../layouts/UploadLayout.tsx";
import {ChangeEvent, DragEvent, useEffect, useRef, useState} from "react";
import {useMutation} from "@apollo/client";
import {CREATE_POST} from "../graphql/mutations/CreatePost.ts";
import UploadError from "../components/UploadError.tsx";
import {FiUploadCloud} from "react-icons/fi";
import mobileCase from '../assets/images/mobile-case.png'
import tikTokLogo from '../assets/images/tiktok-logo-white.png'
import {IoCheckmarkDoneCircleOutline} from "react-icons/io5";
import {GiBoxCutter} from "react-icons/gi";

const Upload = () => {
  const [fileData, setFileData] = useState<File | null>(null);
  const [fileDisplay, setFileDisplay] = useState<string | null>(null);
  const [show, setShow] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [caption, setCaption] = useState("");
  const [errorType, setErrorType] = useState<string | null>(null);

  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // TODO вынести данные для отображения просто в useMemo чтобы не дублировать
      setFileDisplay(URL.createObjectURL(e.target.files[0]));
      setFileData(e.target.files[0]);
    }
  }

  const [createPost] = useMutation(CREATE_POST, {
    onError: (err) => {
      console.log(err)
      setErrors(err.graphQLErrors[0]?.extensions?.errors as string[])
    },
    variables: {
      text: caption,
      video: fileData
    }
  })

  const onDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    setErrorType(null)
    setFileData(e.dataTransfer.files[0])
    const extension = e.dataTransfer.files[0]?.name.split(".").pop()
    if (extension !== 'mp4') {
      setErrorType("file")
      return
    }

    setFileDisplay(URL.createObjectURL(e.dataTransfer.files[0]))
  }

  const clearVideo = () => {
    setFileDisplay(null)
    setFileData(null)
  }

  const discard = () => {
    setFileData(null)
    setFileDisplay(null)
    setCaption("")
  }

  const handleCreatePost = async () => {
    try {
      setIsUploading(true)
      await createPost()
      setIsUploading(false)
      setShow(true)
      discard()
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    if (caption.length === 150) {
      setErrorType("caption")
      return
    }

    setErrorType(null)
  }, [caption]);

  return (
    <>
      <UploadError errorType={errorType} />
      <UploadLayout>
        <div className="w-full mt-[80px] mb-[40px] bg-white shadow-lg rounded-md py-6 md:px-10 px-4">
          <div>
            <div className="text-[23px] font-semibold">
              Upload video
            </div>

            <div className="text-gray-400 mt-1">
              Post a video to your account
            </div>

            <div className="mt-8 md:flex gap-6 ">
              {!fileDisplay && (
                <label
                htmlFor="fileInput"
                className="md:mx-0 mx-auto mt-4 mb-6 flex flex-col items-center justify-center w-full max-w-[260px] h-[470px] text-center p-3 border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-100 cursor-pointer"
                onDragOver={e => e.preventDefault()}
                onDragEnter={e => e.preventDefault()}
                onDrop={onDrop}
              >
                <FiUploadCloud size={50} color="#b3b3b1"/>

                <div className="mt-4 text-[17px]">Select a video to upload</div>

                <div className="mt-1.5 text-gray-500 text-[13px]">Or drag and drop a file</div>

                <div className="mt-12 text-gray-400 text-sm">MP4</div>

                <div className="mt-2 text-gray-400 text-[13px]">
                  Up to 30 minutes
                </div>

                <div className="mt-2 text-gray-400 text-[13px]">Less than 2 GB</div>

                <div className="px-2 py-1.5 mt-8 text-white text-[15px] w-[80%] bg-[#f02c56]">
                  Select file
                </div>

                <input
                  ref={fileRef}
                  type="file"
                  id="fileInput"
                  className="hidden"
                  accept="video/mp4"
                  onChange={handleFileChange}
                />

              </label>
              )}

              {fileDisplay && (
                <>
                <div
                  className="md:mx-0 mx-auto mt-4 md:mb-12 mb-16 flex items-center justify-center w-full max-w-[260px]
               h-[540px] p-3 rounded-2xl cursor-pointer relative"
                >
                  <div className="bg-black h-full w-full"/>
                  <img src={mobileCase} alt="mobile case" className="absolute z-20 pointer-events-none"/>
                  <img src={tikTokLogo} alt="tik-tok logo" className="absolute right-4 bottom-6 z-20" width="90"/>

                  <video
                    src={fileDisplay}
                    autoPlay
                    loop
                    muted
                    controls
                    className="absolute rounded-xl object-cover z-10 p-[13px] w-full h-full"
                  />

                  <div
                    className="absolute -bottom-12 flex items-center justify-between border-gray-300 w-full p-2 border rounded-xl z-50">
                    <div className="flex justify-between truncate">
                      <IoCheckmarkDoneCircleOutline size="16" className="min-w-[16px]"/>
                      <div className="text-[11px] pl-1 truncate text-ellipsis">
                        {fileData?.name}
                      </div>
                    </div>
                    <button
                      className="text-[11px]"
                      onClick={clearVideo}
                    >
                      Clear
                    </button>
                  </div>
                </div>

                <div className="mt-4 mb-6">
                  <div className="flex bg-[#f8f8f8] py-4 px-6">
                    <GiBoxCutter className="mr-4" size="20"/>

                    <div>
                      <div className="font-semibold text-[15px] mb-1.5">
                        Divide videos and edit
                      </div>

                      <div className="font-semibold text-[13px] text-gray-400">
                        You can quickly divide videos into multiple clips ad edit them.
                      </div>
                    </div>

                    <div className="flex justify-end max-w-[130px] w-full h-full text-center my-auto">
                      <button className="px-8 py-1.5 text-white text-[15px] bg-[#f02c56] rounded-sm">
                        Edit
                      </button>
                    </div>
                  </div>

                  <div className="mt-5">
                    <div className="mb-1 text-[15px]">Caption</div>
                    <div className="text-gray-400 text-[12px]">{caption.length}</div>
                  </div>

                  <input
                    className="w-full border p-2.5 rounded-md focus:outline-none"
                    type="text"
                    maxLength={150}
                    value={caption}
                    onChange={e => setCaption(e.target.value)}
                  />

                  <div className="flex gap-3">
                    <button
                      className="px-10 py-2.5 mt-8 border text-[16px] hover:bg-gray-100 transition-all duration-300 rounded-sm"
                      onClick={discard}
                    >
                      Discard
                    </button>

                    <button
                      className="px-10 py-2.5 mt-8 border text-[16px] rounded-sm text-white bg-[#f02c56]"
                      onClick={handleCreatePost}
                    >
                      Post
                    </button>
                  </div>
                </div>
              </>
              )}
            </div>
          </div>
        </div>
      </UploadLayout>
    </>

  );
};

export default Upload;