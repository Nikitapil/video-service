import { gql } from '@apollo/client';

export const GET_COMMENTS_BY_POST_ID = gql`
  query GetCommentsByPostId($postId: Int!) {
    getCommentsByPostId(postId: $postId) {
      id
      text
      createdAt
      user {
        id
        fullname
        email
        image
      }
      canDelete
    }
  }
`;
