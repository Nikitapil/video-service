import tikTokLogo from '../assets/images/tiktok-logo.png'
import avatarPlaceholder from '../assets/images/avatar-placeholder.png';
import {useGeneralStore} from "../stores/generalStore.ts";
import {useUserStore} from "../stores/userStore.ts";
import {useMutation} from "@apollo/client";
import {LOGOUT_USER} from "../graphql/mutations/Logout.ts";
import {Link} from "react-router-dom";
import {useMemo, useState} from "react";
import {AiOutlineSearch, AiOutlineUpload} from "react-icons/ai";
import {BsFillPersonFill, BsFillSendFill} from "react-icons/bs";
import {BiMessageDetail} from "react-icons/bi";
import {GrLogout} from "react-icons/gr";
// TODO hide non user button
const TopNav = () => {
  const isLoginOpen = useGeneralStore(state => state.isLoginOpen)
  const setIsLoginOpen = useGeneralStore(state => state.setIsLoginOpen)
  const user = useUserStore()
  const logout = useUserStore(state => state.logout)
  const [logoutUser] = useMutation(LOGOUT_USER)

  const [showMenu, setShowMenu] = useState<boolean>(false)

  const handleLogout = async () => {
    try {
      await logoutUser()
      logout()
    } catch (e) {
      console.log(e)
    }
  }

  const userImageSrc = useMemo(() => user.image || avatarPlaceholder, [user])

  return (
    <div className="bg-white fixed z-30 flex items-center w-full border-b h-[61px]">
      <div className="container mx-auto flex items-center justify-between w-full px-6">
        <Link to="/">
          <img src={tikTokLogo} alt="tik-tok-logo" width="100" height="100"/>
        </Link>

        <div className="hidden md:flex items-center bg-[#f1f1f1] p-1 rounded-full max-w-[380px]">
          <input
            type="text"
            className="w-full pl-3 my-2 bg-transparent placeholder-[#838383] text-[15px] outline-none"
            placeholder="Search accounts"
          />
          <div className="px-3 py-1 items-center border-l border-l-gray-300">
            <AiOutlineSearch  size="20" color="#838383"/>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 min-w-[275px] max-w-[320px] w-full">
          <Link to="/upload" className="flex items-center border rounded-sm px-3 py-[6px] hover:bg-gray-100">
            <AiOutlineUpload  size="20" color="#161724"/>
            <span className="px-2 font-medium text-[15px] text-[#161724]">Upload</span>
          </Link>

          {!user.id && (
            <div className="flex items-center">
              <button className="flex items-center bg-[#f02c56] text-white border rounded-md px-3 py-[6px] min-w-[110px]" onClick={() => setIsLoginOpen(true)}>Sign in</button>
            </div>
          )}

          <div className="flex gap-2 items-center">
            <BsFillSendFill size="25" color="#161724" />
            <BiMessageDetail size="25" color="#161724" />

            <div className="relative">
              <button
                className="mt-1"
                onClick={() => setShowMenu(prev => !prev)}
              >
                <img
                  src={userImageSrc}
                  alt="avatar"
                  className="rounded-full"
                  width="33"
                />
              </button>

              {showMenu && <div className="absolute bg-white rounded-lg py-1.5 w-[200px] shadow-xl border top-[43px] -right-2">
                <Link
                  to={`/profile/${user.id}`}
                  className="flex items-center gap-1.5 px-3 py-2 hover:bg-gray-100 transition-all duration-300"
                  onClick={() => setShowMenu(false)}
                >
                  <BsFillPersonFill size="20" color="#161724"/>
                  <span className="font-semibold text-sm">Profile</span>
                </Link>

                {user.id && (
                  <button
                    className="flex items-center w-full gap-1.5 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-all duration-300"
                    onClick={handleLogout}
                  >
                    <GrLogout size="20" color="#161724"/>
                    <span className="font-semibold text-sm">Log out</span>
                  </button>
                )}
              </div>}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TopNav;