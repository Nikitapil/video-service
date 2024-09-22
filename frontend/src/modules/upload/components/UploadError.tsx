import {useEffect, useState} from "react";

const UploadError = ({ errorType }: { errorType: string | null }) => {
  const [error, setError] = useState<string>('');

  useEffect(() => {
    switch (errorType) {
      case "caption":
        setError("Max. 150 characters");
        break;
      case "bio":
        setError("Max. 80 characters");
        break;
      case "file":
        setError("Only .mp4 files are allowed")
        break;
      default:
        setError('')
    }
  }, [errorType]);

  if (!errorType) {
    return null
  }

  return (
    <div className="w-full relative flex justify-center">
      <div className='absolute top-6 z-50 mx-auto bg-black text-white bg-opacity-70 px-14 py-3 rounded-sm'>
        { error }
      </div>
    </div>
  );
};

export default UploadError;