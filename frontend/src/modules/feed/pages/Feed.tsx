import MainLayout from '../../../layouts/main/MainLayout.tsx';
import { useQuery } from '@apollo/client';
import { GetPostsQuery } from '../../../gql/graphql.ts';
import { GET_ALL_POSTS } from '../queries/GetPosts.ts';
import FeedPost from '../components/FeedPost.tsx';
import { FormEvent, useCallback, useState } from 'react';
import Observer from '../../../components/Observer.tsx';
import AppInput from '../../../components/ui/AppInput.tsx';
import AppButton from '../../../components/ui/AppButton.tsx';
import { RiSendPlane2Fill } from 'react-icons/ri';

const Feed = () => {
  const [search, setSearch] = useState('');

  const { data, fetchMore, refetch } = useQuery<GetPostsQuery>(GET_ALL_POSTS, {
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

  const onSubmitSearchForm = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      refetch({
        skip: 0,
        take: 2,
        search
      });
    },
    [refetch, search]
  );

  const loadMorePosts = useCallback(async () => {
    await fetchMore({
      variables: { skip: data?.getPosts.length || 0, take: 2, search },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return prev;
        }
        return {
          getPosts: [...prev.getPosts, ...fetchMoreResult.getPosts]
        };
      }
    });
  }, [data?.getPosts.length, fetchMore, search]);

  return (
    <MainLayout>
      <div className="mx-auto max-w-[690px] py-4">
        <form
          className="flex gap-2"
          onSubmit={onSubmitSearchForm}
        >
          <div className="flex-1">
            <AppInput
              placeholder="Search posts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <AppButton type="submit">
            <RiSendPlane2Fill size="20" />
          </AppButton>
        </form>

        {!data?.getPosts.length && <p className="text-center text-xl font-semibold">Posts Not Found</p>}

        {data?.getPosts.map((post) => (
          <FeedPost
            key={post.id}
            post={post}
            onTagClick={onSearchByTag}
          />
        ))}
        {(data?.getPosts.length || 0) > 1 && <Observer callback={loadMorePosts} />}
      </div>
    </MainLayout>
  );
};

export default Feed;
