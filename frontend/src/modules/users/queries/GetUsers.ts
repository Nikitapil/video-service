import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query GetUsers($search: String) {
    getUsers(getUsersInput: { search: $search }) {
      id
      fullname
      email
      image
      bio
    }
  }
`;
