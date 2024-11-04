import { gql } from '@apollo/client';

export const GET_FAVORITE_USER_POSTS = gql`
  query getFavoriteUserPosts($userId: Int!) {
    getFavoriteUserPosts(userId: $userId) {
      id
      text
      video
    }
  }
`;
