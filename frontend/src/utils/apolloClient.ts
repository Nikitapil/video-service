import {
  ApolloClient,
  ApolloLink,
  DefaultContext,
  gql,
  InMemoryCache,
  NormalizedCacheObject,
  Observable
} from '@apollo/client';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';

const refreshToken = async (client: ApolloClient<NormalizedCacheObject>) => {
  try {
    const { data } = await client.mutate({
      mutation: gql`
        mutation RefreshToken {
          refreshToken {
            accessToken
          }
        }
      `
    });

    const newAccessToken = data?.refreshToken.accessToken;
    if (!newAccessToken) {
      throw new Error('New access token not received');
    }

    localStorage.setItem('accessToken', newAccessToken);

    return `Bearer ${newAccessToken}`;
  } catch (err) {
    console.error(err);
    throw new Error('error getting new access token');
  }
};

let retryCount = 0;
const maxRetry = 3;

const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      if (err.extensions?.code === 'UNAUTHENTICATED' && retryCount < maxRetry) {
        retryCount++;
        return new Observable((observer) => {
          refreshToken(client)
            .then((token) => {
              operation.setContext((previousContext: DefaultContext) => ({
                headers: {
                  ...previousContext.headers,
                  authorization: token
                }
              }));
              const forward$ = forward(operation);
              forward$.subscribe(observer);
            })
            .catch((error) => observer.error(error));
        });
      }
    }
  }
});

const uploadLink = createUploadLink({
  uri: `${import.meta.env.VITE_APP_BACKEND_BASE_URL}/graphql`,
  credentials: 'include',
  headers: {
    'apollo-require-preflight': 'true'
  }
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('accessToken');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  };
});

export const client = new ApolloClient({
  uri: `${import.meta.env.VITE_APP_BACKEND_BASE_URL}/graphql`,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          getCommentsByPostId: {
            merge(_, incoming) {
              return incoming;
            }
          }
        }
      }
    }
  }),
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
    authorization: `Bearer ${localStorage.getItem('accessToken')}`
  },
  link: ApolloLink.from([authLink, errorLink, uploadLink]),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache'
    },
    query: {
      fetchPolicy: 'no-cache'
    }
  }
});
