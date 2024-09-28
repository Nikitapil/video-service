import { useQuery } from '@apollo/client';
import { GET_SUGGESTED_USERS } from './queries/GetSuggestedUsers.ts';
import { useMemo, useState } from 'react';
import { GetSuggestedUsersQuery } from '../../../../gql/graphql.ts';
import { Link } from 'react-router-dom';
import MenuItem from './MenuItem.tsx';
import { AiFillHome } from 'react-icons/ai';
import { BiGroup, BiMessageDetail } from 'react-icons/bi';
import { RiLiveLine } from 'react-icons/ri';
import MenuItemSuggested from './MenuItemSuggested.tsx';

const SideNav = () => {
  //TODO use loading and error state
  const { data, loading, fetchMore } = useQuery<GetSuggestedUsersQuery>(GET_SUGGESTED_USERS, {});
  const [showAllUsers, setShowAllUsers] = useState(false);

  const displayedUsers = useMemo(() => {
    return showAllUsers ? data?.getUsers : data?.getUsers.slice(0, 3);
  }, [showAllUsers, data]);

  const isShowMoreBtn = useMemo(() => {
    return (data?.getUsers?.length || 0) > 3;
  }, [data]);

  return (
    <div className="fixed z-20 h-full overflow-auto border-r bg-white pt-[70px] lg:w-[310px] lg:border-r-0">
      <div className="mx-auto w-[55px] lg:w-full">
        <Link to="/">
          <MenuItem
            Icon={AiFillHome}
            color="#F02C56"
            size="30"
            text="For you"
          />
        </Link>

        <MenuItem
          Icon={BiGroup}
          color="#000"
          size="27"
          text="Following"
        />

        <MenuItem
          Icon={RiLiveLine}
          color="#000"
          size="27"
          text="LIVE"
        />

        <MenuItem
          Icon={BiMessageDetail}
          color="#000"
          size="27"
          text="MESSEGES"
        />

        <div className="mt-2 border-b lg:ml-2" />

        <div className="hidden px-2 pb-2 pt-4 text-xs font-semibold text-gray-600 lg:block">Suggested accounts</div>

        <div className="border-b pt-3 lg:hidden" />

        <ul>
          {displayedUsers?.map((user) => (
            <li
              key={user.id}
              className="cursor-pointer"
            >
              <Link to={`/profile/${user.id}`}>
                <MenuItemSuggested user={user} />
              </Link>
            </li>
          ))}
        </ul>

        {isShowMoreBtn && (
          <button
            className="hidden pl-2 pt-1.5 text-[13px] text-[#f02C56] lg:block"
            onClick={() => setShowAllUsers(!showAllUsers)}
          >
            {showAllUsers ? 'Show less' : 'Show more'}
          </button>
        )}
      </div>
    </div>
  );
};

export default SideNav;
