import { gql } from '@apollo/client';

export const REFRESH_AUTH = gql`
  mutation RefreshAuth {
    refreshToken {
      accessToken
      user {
        id
        email
        image
        fullname
        bio
      }
    }
  }
`;
