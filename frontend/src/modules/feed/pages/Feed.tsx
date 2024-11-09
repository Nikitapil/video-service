import MainLayout from '../../../layouts/main/MainLayout.tsx';
import FeedPost from '../components/FeedPost.tsx';
import { useCallback, useState } from 'react';
import Observer from '../../../components/Observer.tsx';
import AppInput from '../../../components/ui/inputs/AppInput.tsx';
import AppButton from '../../../components/ui/AppButton.tsx';
import { RiSendPlane2Fill } from 'react-icons/ri';
import { useGetPostsQuery } from '../../../gql/graphql.tsx';
import AppForm from '../../../components/ui/AppForm.tsx';
import { useSearchParams } from 'react-router-dom';

const Feed = () => {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState<string>(searchParams.get('searchPost') || '');

  const { data, fetchMore, refetch, loading } = useGetPostsQuery({
    variables: {
      skip: 0,
      take: 2,
      search: search
    }
  });

  const onSearchByTag = useCallback(
    (tag: string) => {
      setSearch(tag);
      refetch({
        skip: 0,
        take: 2,
        search: tag
      });
    },
    [refetch]
  );

  const onSubmitSearchForm = useCallback(() => {
    refetch({
      skip: 0,
      take: 2,
      search
    });
  }, [refetch, search]);

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
      <div className="mx-auto max-w-screen-md py-4">
        <AppForm
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
        </AppForm>

        {!data?.getPosts.length && !loading && <p className="text-center text-xl font-semibold">Posts Not Found</p>}

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
