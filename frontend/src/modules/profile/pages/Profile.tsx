import { useMemo, useState } from 'react';
import MainLayout from '../../../layouts/main/MainLayout.tsx';
import { Link, useParams } from 'react-router-dom';
import { BsFillPencilFill } from 'react-icons/bs';
import PostProfile from '../components/PostProfile.tsx';
import UserAvatar from '../../shared/components/UserAvatar.tsx';
import { useShowElement } from '../../../hooks/useShowElement.ts';
import EditProfileModal from '../components/EditProfileModal.tsx';
import { useGetUserProfileQuery } from '../../../gql/graphql.tsx';
import { ImSpinner2 } from 'react-icons/im';
import NotFoundPage from '../../../components/NotFoundPage.tsx';
import AppButton from '../../../components/ui/AppButton.tsx';
import FollowButton from '../../shared/follows/components/FollowButton.tsx';
import { getUserFollowLink, UserFollowPagesTypesEnum } from '../../../router/routes.ts';
import Tabs from '../../../components/ui/tabs/Tabs.tsx';

enum EProfileVideoTabs {
  VIDEOS = 'VIDEOS',
  LIKED = 'LIKED'
}

const tabs = [
  { value: EProfileVideoTabs.VIDEOS, title: 'Videos' },
  { value: EProfileVideoTabs.LIKED, title: 'Liked' }
];

const Profile = () => {
  const [activeTab, setActiveTab] = useState(EProfileVideoTabs.VIDEOS);

  const { id } = useParams();
  const pageUserId = useMemo(() => Number(id), [id]);

  const editProfileModalElement = useShowElement();

  const { data, loading } = useGetUserProfileQuery({
    variables: {
      userId: pageUserId
    }
  });

  const profile = useMemo(() => {
    return data?.getUserProfile;
  }, [data?.getUserProfile]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <ImSpinner2
          className="ml-1 animate-spin"
          size="100"
        />
      </div>
    );
  }

  if (!profile) {
    return <NotFoundPage text="Profile not found" />;
  }

  return (
    <MainLayout>
      <div className="max-w-full py-10">
        <section className="flex">
          <UserAvatar
            image={profile.image}
            className="!h-24 !w-24 object-cover"
          />

          <div className="ml-5 flex w-full flex-col items-start gap-3">
            <div className="text-3xl font-bold">{profile.fullname}</div>

            {profile.isMyProfile && (
              <AppButton onClick={editProfileModalElement.open}>
                <div className="flex items-center gap-1">
                  <BsFillPencilFill
                    size="18"
                    className="mr-1 mt-0.5"
                  />
                  <span>Edit Profile</span>
                </div>
              </AppButton>
            )}

            <FollowButton user={profile} />
          </div>
        </section>

        <section className="flex items-center gap-3 pt-4">
          <Link to={getUserFollowLink(UserFollowPagesTypesEnum.FOLLOWING, profile.id)}>
            <span className="font-bold">{profile.followingCount}</span>
            <span className="pl-1.5 text-sm font-light text-gray-500">Following</span>
          </Link>

          <Link to={getUserFollowLink(UserFollowPagesTypesEnum.FOLLOWERS, profile.id)}>
            <span className="font-bold">{profile.followersCount}</span>
            <span className="pl-1.5 text-sm font-light text-gray-500">Followers</span>
          </Link>
        </section>

        <p className="my-4 font-light text-gray-500">{profile.bio}</p>

        <Tabs
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {data?.getUserProfile.posts.map((post) => (
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
