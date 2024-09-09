import {ApolloClient, ApolloLink, gql, InMemoryCache, NormalizedCacheObject, Observable} from "@apollo/client";
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';
import {onError} from "@apollo/client/link/error";

const refreshToken = async (client: ApolloClient<NormalizedCacheObject>) => {
  try {
    const { data } = await client.mutate({
      mutation: gql`
      mutation RefreshToken {
          refreshToken
      }
      `
    })

    const newAccessToken = data?.accessToken
    if (!newAccessToken) {
      throw new Error('New access token not received')
    }

    localStorage.setItem('accessToken', newAccessToken)

    return `Bearer ${newAccessToken}`
  } catch (err) {
    console.error(err);
    throw new Error("error getting new access token")
  }
}

let retryCount = 0;
const maxRetry = 3;

const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      if (err.extensions?.code === "UNAUTHENTICATED" && retryCount < maxRetry) {
        retryCount++;
        return new Observable((observer) => {
          refreshToken(client).then((token) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            operation.setContext((previousContext: any) => ({
              headers: {
                ...previousContext.headers,
                authorization: token,
              }
            }))
            const forward$ = forward(operation)
            forward$.subscribe(observer)
          }).catch(error => observer.error(error))
        })
      }
    }
  }
})
//TODO move all urls to env
const uploadLink = createUploadLink({
  uri: "http://localhost:3000/graphql",
  credentials: 'include',
  headers: {
    'apollo-require-preflight': "true"
  }
})

export const client = new ApolloClient({
  uri: "http://localhost:3000/graphql",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          getCommentsByPostId: {
            merge(_, incoming) {
              return incoming
            }
          }
        }
      }
    }
  }),
  credentials: 'include',
  headers: {
    "Content-Type": "application/json",
  },
  link: ApolloLink.from([errorLink, uploadLink])
})