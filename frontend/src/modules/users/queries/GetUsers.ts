import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query GetUsers($search: String, $userFollowers: Int, $userFollowTo: Int, $take: Int, $skip: Int) {
    getUsers(
      getUsersInput: {
        search: $search
        userFollowers: $userFollowers
        userFollowTo: $userFollowTo
        take: $take
        skip: $skip
      }
    ) {
      id
      fullname
      email
      image
      bio
    }
  }
`;
