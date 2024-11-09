import { gql } from '@apollo/client';

export const GET_POST_BY_ID = gql`
  query GetPostById($id: Int!) {
    getPostById(id: $id) {
      id
      text
      video
      createdAt
      tags
      user {
        id
        email
        fullname
        image
      }
      isLiked
      likesCount
      otherPostIds
      canDelete
    }
  }
`;
