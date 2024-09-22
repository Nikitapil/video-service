import { useState } from 'react';
import { useGeneralStore } from '../../stores/generalStore.ts';
import { ImCross } from 'react-icons/im';
import Register from './Register.tsx';
import Login from './Login.tsx';

const AuthModal = () => {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const setLoginIsOpen = useGeneralStore((state) => state.setIsLoginOpen);
  const isLoginOpen = useGeneralStore((state) => state.isLoginOpen);

  return (
    <div
      id="AuthModal"
      className="fixed flex items-center justify-center z-50 top-0 left-0 w-full h-full bg-black bg-opacity-50"
    >
      <div className="relative bg-white w-full max-w-[470px] h-[70%] p-4 rounded-lg">
        <div className="w-full flex justify-end">
          <button
            className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-300"
            onClick={() => setLoginIsOpen(false)}
          >
            <ImCross />
          </button>
        </div>

        {isRegisterMode ? <Register /> : <Login />}

        <div className="absolute flex items-center justify-center py-5 left-0 bottom-0 border-t w-full">
          <span className="text-[14px] text-gray-600">
            {isRegisterMode ? 'Already have an account?' : "Don't have an account?"}
          </span>

          <button
            className="ml-2 hover:bg-gray-100 transition-all duration-300 p-1 rounded text-[14px]"
            onClick={() => setIsRegisterMode((prev) => !prev)}
          >
            {isRegisterMode ? 'Sign in' : 'Sign up'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
