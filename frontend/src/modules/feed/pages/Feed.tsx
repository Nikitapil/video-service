import MainLayout from '../../../layouts/main/MainLayout.tsx';
import { useQuery } from '@apollo/client';
import { GetPostsQuery } from '../../../gql/graphql.ts';
import { GET_ALL_POSTS } from '../queries/GetPosts.ts';
import FeedPost from '../components/FeedPost.tsx';
import { useEffect, useRef, useState } from 'react';

const Feed = () => {
  const loadMoreRef = useRef(null);
  const [search, setSearch] = useState('');

  const { data, loading, fetchMore, refetch } = useQuery<GetPostsQuery>(GET_ALL_POSTS, {
    variables: {
      skip: 0,
      take: 2
    }
  });

  const onSearchByTag = (tag: string) => {
    setSearch(tag);
    refetch({
      skip: 0,
      take: 2,
      search: tag
    });
  };

  const loadMorePosts = async () => {
    try {
      await fetchMore({
        variables: { skip: data?.getPosts.length || 0, take: 2, search },
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
      <div className="mx-auto max-w-[690px]">
        {data?.getPosts.map((post) => (
          <FeedPost
            key={post.id}
            post={post}
            onTagClick={onSearchByTag}
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
