import { gql } from '@apollo/client';

export const TOGGLE_LIKE_POST = gql`
  mutation LikePost($postId: Int!) {
    toggleLikePost(postId: $postId) {
      isLiked
    }
  }
`;
