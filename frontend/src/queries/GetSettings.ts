import { gql } from '@apollo/client';

export const GET_ALL_POSTS = gql`
  query GetSettings {
    getSettings {
      unreadMessagesCount
    }
  }
`;
