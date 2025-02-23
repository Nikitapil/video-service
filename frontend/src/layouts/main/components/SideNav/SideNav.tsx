import { useMemo, useState } from 'react';
import MenuItem from './MenuItem.tsx';
import { AiFillHome } from 'react-icons/ai';
import { BiGroup, BiSolidGroup } from 'react-icons/bi';
import SuggestedUser from './SuggestedUser.tsx';
import { getUserFollowLink, RoutesEnum, UserFollowPagesTypesEnum } from '../../../../router/routes.ts';
import { ImSpinner2 } from 'react-icons/im';
import { BsEnvelope } from 'react-icons/bs';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { useUserStore } from '../../../../modules/shared/auth/stores/userStore.ts';
import { useGetSuggestedUsersQuery } from '../../../../gql/graphql.tsx';
import { useAppStore } from '../../../../store/appStore.ts';

const SideNav = () => {
  const SHOWED_USERS_LIMIT = 3;
  const [showAllUsers, setShowAllUsers] = useState(false);
  const user = useUserStore((state) => state.user);
  const unreadMessages = useAppStore((state) => state.settings.unreadMessagesCount);

  const { data, loading } = useGetSuggestedUsersQuery();

  const displayedUsers = useMemo(() => {
    return showAllUsers ? data?.getUsers : data?.getUsers.slice(0, SHOWED_USERS_LIMIT);
  }, [showAllUsers, data]);

  const isShowMoreBtn = useMemo(() => {
    return (data?.getUsers?.length || 0) > SHOWED_USERS_LIMIT;
  }, [data]);

  return (
    <nav className="h-full min-w-fit overflow-auto border-r bg-white pt-16 lg:w-72">
      <div>
        <MenuItem
          to={RoutesEnum.HOME}
          Icon={AiFillHome}
          text="Home"
          iconColor="#f02c56"
        />

        <MenuItem
          to={getUserFollowLink(UserFollowPagesTypesEnum.FOLLOWING, user?.id || 0)}
          Icon={BiGroup}
          text="Following"
        />

        <MenuItem
          to={getUserFollowLink(UserFollowPagesTypesEnum.FOLLOWERS, user?.id || 0)}
          Icon={BiSolidGroup}
          text="Followers"
        />

        <MenuItem
          to={RoutesEnum.MESSAGES}
          Icon={BsEnvelope}
          text="MESSAGES"
          count={unreadMessages}
        />

        <hr className="mt-2" />

        <h6 className="hidden px-2 pb-2 pt-4 text-xs font-semibold text-gray-600 lg:block">Suggested accounts</h6>

        {loading && (
          <div
            className="mt-2 px-2"
            data-testid="nav-loading"
          >
            <ImSpinner2 className="h-8 w-8 animate-spin" />
          </div>
        )}

        <ul>
          {displayedUsers?.map((user) => (
            <li
              key={user.id}
              data-testid="suggested-users"
            >
              <SuggestedUser user={user} />
            </li>
          ))}
        </ul>

        {isShowMoreBtn && (
          <button
            className="ml-2 flex items-center justify-center gap-1 pl-2 pt-1.5 text-sm text-red-600 common-transition hover:text-red-800 lg:ml-0"
            data-testid="nav-show-more-btn"
            onClick={() => setShowAllUsers(!showAllUsers)}
          >
            {showAllUsers ? <IoIosArrowUp /> : <IoIosArrowDown />}
            <span className="hidden lg:block">{showAllUsers ? 'Show less' : 'Show more'}</span>
          </button>
        )}
      </div>
    </nav>
  );
};

export default SideNav;
