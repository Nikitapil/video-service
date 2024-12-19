import { gql } from '@apollo/client';

export const EDIT_POST = gql`
  mutation EditPost($postId: Int!, $text: String!, $tags: String!) {
    editPost(editPostInput: { postId: $postId, text: $text, tags: $tags }) {
      id
    }
  }
`;
