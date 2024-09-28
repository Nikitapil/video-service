import { AiOutlineSearch } from 'react-icons/ai';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUsersSearchLink } from '../../../router/routes.ts';

const SearchUsersForm = () => {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState('');

  const navigate = useNavigate();

  const onSearch = () => {
    navigate(getUsersSearchLink(search));
  };

  useEffect(() => {
    const searchFromParams = searchParams.get('search');

    if (searchFromParams) {
      setSearch(searchFromParams);
    }
  }, [searchParams]);

  return (
    <div className="flex items-center rounded-full bg-gray-100 p-1">
      <input
        type="text"
        className="my-2 w-full bg-transparent pl-3 placeholder-gray-500 outline-none"
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
  );
};

export default SearchUsersForm;
