import { gql } from '@apollo/client';

export const GET_SUGGESTED_USERS = gql`
  query GetSuggestedUsers {
    getUsers {
      id
      fullname
      email
      image
    }
  }
`;
