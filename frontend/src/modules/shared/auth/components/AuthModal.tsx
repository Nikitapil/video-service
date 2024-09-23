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
      className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50"
    >
      <div className="relative h-[70%] w-full max-w-[470px] rounded-lg bg-white p-4">
        <div className="flex w-full justify-end">
          <button
            className="rounded-full bg-gray-100 p-1.5 transition-all duration-300 hover:bg-gray-200"
            onClick={() => setLoginIsOpen(false)}
          >
            <ImCross />
          </button>
        </div>

        {isRegisterMode ? <Register /> : <Login />}

        <div className="absolute bottom-0 left-0 flex w-full items-center justify-center border-t py-5">
          <span className="text-[14px] text-gray-600">
            {isRegisterMode ? 'Already have an account?' : "Don't have an account?"}
          </span>

          <button
            className="ml-2 rounded p-1 text-[14px] transition-all duration-300 hover:bg-gray-100"
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
