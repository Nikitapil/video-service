import { useUserStore } from '../../modules/shared/auth/stores/userStore.ts';
import { useMutation } from '@apollo/client';
import { LOGOUT_USER } from '../../modules/shared/auth/mutations/Logout.ts';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AiOutlineSearch, AiOutlineUpload } from 'react-icons/ai';
import { BsFillPersonFill, BsFillSendFill } from 'react-icons/bs';
import { BiMessageDetail } from 'react-icons/bi';
import { GrLogout } from 'react-icons/gr';
import UserAvatar from '../../modules/shared/components/UserAvatar.tsx';
import Logo from '../../components/Logo.tsx';

const AppHeader = () => {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState('');

  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);
  const setIsLoading = useUserStore((state) => state.setIsAuthLoading);

  const navigate = useNavigate();

  const [logoutUser] = useMutation(LOGOUT_USER);

  const [showMenu, setShowMenu] = useState<boolean>(false);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await logoutUser();
      logout();
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const onSearch = () => {
    navigate(`/users/?search=${search}`);
  };

  useEffect(() => {
    const searchFromParams = searchParams.get('search');

    if (searchFromParams) {
      setSearch(searchFromParams);
    }
  }, [searchParams]);

  if (!user) {
    return null;
  }

  return (
    <header className="fixed z-30 flex h-16 w-full items-center border-b bg-white">
      <div className="container mx-auto flex w-full items-center justify-between px-6">
        <Link to="/">
          <Logo />
        </Link>

        <div className="hidden items-center rounded-full bg-gray-100 p-1 md:flex">
          <input
            type="text"
            className="my-2 w-full bg-transparent pl-3 text-[15px] placeholder-gray-500 outline-none"
            placeholder="Search accounts"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button
            className="border-l border-l-gray-300 px-3 py-1 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!search}
            onClick={onSearch}
          >
            <AiOutlineSearch
              className="text-gray-500"
              size="20"
            />
          </button>
        </div>

        <div className="flex w-full min-w-[275px] max-w-[320px] items-center justify-end gap-3">
          <Link
            to="/upload"
            className="flex items-center rounded-sm border px-3 py-[6px] hover:bg-gray-100"
          >
            <AiOutlineUpload
              size="20"
              color="#161724"
            />
            <span className="px-2 text-[15px] font-medium text-[#161724]">Upload</span>
          </Link>

          <div className="flex items-center gap-2">
            <BsFillSendFill
              size="25"
              color="#161724"
            />
            <BiMessageDetail
              size="25"
              color="#161724"
            />

            <div className="relative">
              <button
                className="mt-1"
                onClick={() => setShowMenu((prev) => !prev)}
              >
                <UserAvatar image={user.image} />
              </button>

              {showMenu && (
                <div className="absolute -right-2 top-[43px] w-[200px] rounded-lg border bg-white py-1.5 shadow-xl">
                  <Link
                    to={`/profile/${user.id}`}
                    className="flex items-center gap-1.5 px-3 py-2 transition-all duration-300 hover:bg-gray-100"
                    onClick={() => setShowMenu(false)}
                  >
                    <BsFillPersonFill
                      size="20"
                      color="#161724"
                    />
                    <span className="text-sm font-semibold">Profile</span>
                  </Link>

                  {user.id && (
                    <button
                      className="flex w-full items-center gap-1.5 px-4 py-2 text-sm text-gray-700 transition-all duration-300 hover:bg-gray-100 hover:text-gray-900"
                      onClick={handleLogout}
                    >
                      <GrLogout
                        size="20"
                        color="#161724"
                      />
                      <span className="text-sm font-semibold">Log out</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
