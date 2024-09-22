import MainLayout from '../../../layouts/main/MainLayout.tsx';
import { useQuery } from '@apollo/client';
import { GetPostsQuery } from '../../../gql/graphql.ts';
import { GET_ALL_POSTS } from '../queries/GetPosts.ts';
import PostFeed from '../components/PostFeed.tsx';
import { useEffect, useRef } from 'react';

const Feed = () => {
  const loadMoreRef = useRef(null);

  const { data, loading, fetchMore } = useQuery<GetPostsQuery>(GET_ALL_POSTS, {
    variables: {
      skip: 0,
      take: 2
    }
  });

  const loadMorePosts = async () => {
    try {
      await fetchMore({
        variables: { skip: data?.getPosts.length || 0, take: 2 },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          // Todo фильтр ниже скорее всего не нужен, перепроверить
          return {
            getPosts: [...prev.getPosts, ...fetchMoreResult.getPosts]
          };
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMorePosts();
        }
      },
      { threshold: 1 }
    );

    if (data?.getPosts && observer && loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [data?.getPosts]);

  return (
    <MainLayout>
      <div className="max-w-[690px] mx-auto">
        {data?.getPosts.map((post) => (
          <PostFeed
            key={post.id}
            post={post}
          />
        ))}
        <div
          ref={loadMoreRef}
          className="h-1"
        ></div>
      </div>
    </MainLayout>
  );
};

export default Feed;
