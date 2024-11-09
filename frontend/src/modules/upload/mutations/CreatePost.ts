import { gql } from '@apollo/client';

export const CREATE_POST = gql`
  mutation CreatePost($text: String!, $video: Upload!, $tags: String) {
    createPost(text: $text, video: $video, tags: $tags) {
      id
    }
  }
`;
