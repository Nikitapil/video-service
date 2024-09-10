import {GetUsersQuery} from "../gql/graphql.ts";
import {useMemo} from "react";
import avatarPlaceholder from "../assets/images/avatar-placeholder.png";
import {AiOutlineCheck} from "react-icons/ai";
import {ArrayElement} from "../utils/types.ts";
// TODO extract props interface
const MenuItemSuggested = ({ user }: { user: ArrayElement<GetUsersQuery['getUsers']> }) => {

  const userImageSrc = useMemo(() => user.image || avatarPlaceholder, [user])

  return (
    <div className="flex items-center hover:bg-gray-100 rounded-md w-full py-1.5 px-2">
      <img src={userImageSrc} alt="avatar" className="rounded-full lg:mx-0 mx-auto" width="33" />

      <div className="lg:pl-2.5 lg:block hidden">
        <div className="flex items-center">
          <div className="font-bold text-[14px]">User name</div>
          <div className="ml-1 rounded-full bg-[#58D5EC] h-[14px]">
            <AiOutlineCheck className="relative" color="#fff" size="15" />
          </div>
        </div>

        <div className="font-light text-[12px] text-gray-600">
          {user.fullname}
        </div>
      </div>
    </div>
  );
};

export default MenuItemSuggested;