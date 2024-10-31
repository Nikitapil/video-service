import { useUserStore } from '../../shared/auth/stores/userStore.ts';
import { useMemo } from 'react';
import MainLayout from '../../../layouts/main/MainLayout.tsx';
import { useQuery } from '@apollo/client';
import { GET_POSTS_BY_USER_ID } from '../queries/GetPostsByUserId.ts';
import { useParams } from 'react-router-dom';
import { GetPostsByUserIdQuery, GetPostsByUserIdQueryVariables } from '../../../gql/graphql.ts';
import { BsFillPencilFill } from 'react-icons/bs';
import PostProfile from '../components/PostProfile.tsx';
import UserAvatar from '../../shared/components/UserAvatar.tsx';
import { useShowElement } from '../../../hooks/useShowElement.ts';
import EditProfileModal from '../components/EditProfileModal.tsx';

const Profile = () => {
  const { id } = useParams();
  const pageUserId = useMemo(() => Number(id), [id]);
  const user = useUserStore((state) => state.user);

  const editProfileModalElement = useShowElement();

  const { data, loading, error } = useQuery<GetPostsByUserIdQuery, GetPostsByUserIdQueryVariables>(
    GET_POSTS_BY_USER_ID,
    {
      variables: {
        userId: pageUserId
      }
    }
  );

  if (!user) {
    return null;
  }

  return (
    <MainLayout>
      <div className="max-w-full pl-[80px] pr-2 pt-[90px] lg:pr-0 2xl:mx-auto">
        <div className="flex">
          <UserAvatar
            image={user.image}
            className="!h-24 !w-24 object-cover"
          />

          <div className="ml-5 w-full">
            <div className="truncate text-[30px] font-bold">User name</div>
            <div className="truncate text-[18px]">{user.fullname}</div>
            <button
              className="mt-3 flex items-center rounded-md border px-3.5 py-1.5 text-[15px] font-semibold transition-all duration-300 hover:bg-gray-100"
              onClick={editProfileModalElement.open}
            >
              <BsFillPencilFill
                size="18"
                className="mr-1 mt-0.5"
              />
              <div>Edit Profile</div>
            </button>
            <button className="mt-3 flex items-center rounded-md bg-[#f02c56] px-8 py-1.5 text-[15px] font-semibold text-white">
              Follow
            </button>
          </div>
        </div>

        <div className="flex items-center pt-4">
          <div className="mr-4">
            <span className="font-bold">10k</span>
            <span className="pl-1.5 text-[15px] font-light text-gray-500">Following</span>
          </div>

          <div className="mr-4">
            <span className="font-bold">10k</span>
            <span className="pl-1.5 text-[15px] font-light text-gray-500">Followers</span>
          </div>
        </div>

        <div className="mr-4 max-w-[500px] pt-5 text-[15px] font-light text-gray-500">This is the bio section</div>

        <div className="flex w-full items-center border-b pt-4">
          <div className="flex-1 border-b-2 border-b-black py-5 text-center text-[17px] font-semibold">Videos</div>

          <div className="flex-1 py-5 text-center text-[17px] font-semibold text-gray-500">Liked</div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {data?.getPostsByUserId.map((post) => (
            <PostProfile
              key={post.id}
              post={post}
            />
          ))}
        </div>
      </div>
      <EditProfileModal showElement={editProfileModalElement} />
    </MainLayout>
  );
};

export default Profile;
