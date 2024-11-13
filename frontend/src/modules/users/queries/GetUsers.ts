import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query GetUsers($search: String, $userFollowers: Boolean, $userFollowTo: Boolean) {
    getUsers(getUsersInput: { search: $search, userFollowers: $userFollowers, userFollowTo: $userFollowTo }) {
      id
      fullname
      email
      image
      bio
    }
  }
`;
