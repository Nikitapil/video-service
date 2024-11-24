import { gql } from '@apollo/client';

export const CREATE_COMMENT = gql`
  mutation CreateComment($text: String!, $postId: Int!) {
    createComment(createCommentInput: { text: $text, postId: $postId }) {
      id
    }
  }
`;
