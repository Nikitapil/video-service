import {ApolloClient, gql, NormalizedCacheObject, Observable} from "@apollo/client";
import {onError} from "@apollo/client/link/error";

const refreshToken = async (client: ApolloClient<NormalizedCacheObject>) => {
  try {
    const { data } = await client.mutate({
      mutation: gql`
      mutation RefreshToken {
          accessToken
      }`
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