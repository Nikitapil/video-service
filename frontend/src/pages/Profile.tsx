import {useUserStore} from "../stores/userStore.ts";
import {useMemo} from "react";
import avatarPlaceholder from "../assets/images/avatar-placeholder.png";
import MainLayout from "../layouts/MainLayout.tsx";
import {useQuery} from "@apollo/client";
import {GET_POSTS_BY_USER_ID} from "../graphql/queries/GetPostsByUserId.ts";
import {useParams} from "react-router-dom";
import {GetPostsByUserIdQuery, GetPostsByUserIdQueryVariables} from "../gql/graphql.ts";
import {BsFillPencilFill} from "react-icons/bs";
import {useGeneralStore} from "../stores/generalStore.ts";
import PostProfile from "../components/PostProfile.tsx";

const Profile = () => {
  const { id } = useParams();
  const pageUserId = useMemo(() => Number(id), [id])
  const user = useUserStore()
  const isEditModalOpen = useGeneralStore((state) => state.isEditProfileOpen)
  const setIsEditModalOpen = useGeneralStore((state) => state.setIsEditProfileOpen)

  const { data, loading, error } = useQuery<GetPostsByUserIdQuery, GetPostsByUserIdQueryVariables>(GET_POSTS_BY_USER_ID, {
    variables: {
      userId: pageUserId
    }
  })

  const userImageSrc = useMemo(() => user.image || avatarPlaceholder, [user])

  return (
    <MainLayout>
      <div
        className="pt-[90px] pl-[80px] lg:pr-0 pr-2 max-w-full 2xl:mx-auto">
        <div className="flex">
          <img
            src={userImageSrc}
            alt="avatar"
            className="w-[100px] h-[100px] rounded-full object-cover"
          />

          <div className="ml-5 w-full">
            <div className="text-[30px] font-bold truncate">User name</div>
            <div className="text-[18px] truncate">{user.fullname}</div>
            <button
              className="flex items-center rounded-md py-1.5 px-3.5 mt-3 text-[15px] font-semibold border hover:bg-gray-100 transition-all duration-300"
              onClick={setIsEditModalOpen}
            >
              <BsFillPencilFill size="18" className="mt-0.5 mr-1" />
              <div>Edit Profile</div>
            </button>
            <button className="flex items-center rounded-md py-1.5 px-8 mt-3 text-[15px] text-white font-semibold bg-[#f02c56]">
              Follow
            </button>
          </div>
        </div>

        <div className="flex items-center pt-4">
          <div className="mr-4">
            <span className="font-bold">10k</span>
            <span className="text-gray-500 font-light text-[15px] pl-1.5">
              Following
            </span>
          </div>

          <div className="mr-4">
            <span className="font-bold">10k</span>
            <span className="text-gray-500 font-light text-[15px] pl-1.5">
              Followers
            </span>
          </div>
        </div>

        <div className="pt-5 mr-4 text-gray-500 font-light text-[15px] max-w-[500px]">
          This is the bio section
        </div>

        <div className="flex w-full items-center pt-4 border-b">
          <div className="flex-1 text-center py-5 text-[17px] font-semibold border-b-2 border-b-black">
            Videos
          </div>

          <div className="text-center text-gray-500 py-5 text-[17px] font-semibold flex-1">
            Liked
          </div>
        </div>

        <div className="mt-4 grid 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-3">
          { data?.getPostsByUserId.map(post => (
            <PostProfile key={post.id} post={post} />
          )) }
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;