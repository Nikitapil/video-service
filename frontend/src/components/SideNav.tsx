import { useQuery } from '@apollo/client';
import { GET_USERS } from '../graphql/queries/GetUsers.ts';
import { useMemo, useState } from 'react';
import { GetUsersQuery } from '../gql/graphql.ts';
import { Link } from 'react-router-dom';
import MenuItem from './MenuItem.tsx';
import { AiFillHome } from 'react-icons/ai';
import { BiGroup } from 'react-icons/bi';
import { RiLiveLine } from 'react-icons/ri';
import MenuItemSuggested from './MenuItemSuggested.tsx';

const SideNav = () => {
  //TODO use loading and error state
  const { data, loading, fetchMore } = useQuery<GetUsersQuery>(GET_USERS, {});
  const [showAllUsers, setShowAllUsers] = useState(false);

  const displayedUsers = useMemo(() => {
    return showAllUsers ? data?.getUsers : data?.getUsers.slice(0, 3);
  }, [showAllUsers, data]);

  const isShowMoreBtn = useMemo(() => {
    return (data?.getUsers?.length || 0) > 3;
  }, [data]);

  return (
    <div className="lg:w-[310px] fixed z-20 bg-white pt-[70px] h-full lg:border-r-0 border-r overflow-auto">
      <div className="lg:w-full w-[55px] mx-auto">
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

        <div className="border-b lg:ml-2 mt-2" />

        <div className="lg:block hidden text-xs text-gray-600 font-semibold pt-4 pb-2 px-2">Suggested accounts</div>

        <div className="border-b lg:hidden pt-3" />

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
            className="lg:block hidden text-[#f02C56] pt-1.5 pl-2 text-[13px]"
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
