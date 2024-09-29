import { gql } from '@apollo/client';

export const GET_SUGGESTED_USERS = gql`
  query GetSuggestedUsers {
    getUsers(getUsersInput: { take: 5 }) {
      id
      fullname
      email
      image
    }
  }
`;
