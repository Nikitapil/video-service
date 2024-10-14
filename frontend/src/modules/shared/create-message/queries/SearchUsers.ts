import { gql } from '@apollo/client';

export const SEARCH_USERS = gql`
  query SearchUsers($search: String) {
    getUsers(getUsersInput: { search: $search }) {
      id
      fullname
    }
  }
`;
