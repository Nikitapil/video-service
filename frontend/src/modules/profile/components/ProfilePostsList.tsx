import { IProfilePost } from '../types.ts';
import PostProfile from './PostProfile.tsx';

export interface ProfilePostsListProps {
  posts: IProfilePost[];
  loading: boolean;
}

const ProfilePostsList = ({ posts, loading }: ProfilePostsListProps) => {
  if (loading) {
    return <p className="text-center text-lg font-semibold">Posts loading...</p>;
  }

  if (!posts.length) {
    return <p className="text-center text-lg font-semibold">No posts yet.</p>;
  }

  return (
    <div className="flex flex-wrap gap-3">
      {posts.map((post) => (
        <PostProfile
          key={post.id}
          post={post}
        />
      ))}
    </div>
  );
};

export default ProfilePostsList;
