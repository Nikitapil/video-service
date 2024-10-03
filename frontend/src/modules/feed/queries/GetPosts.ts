import { gql } from '@apollo/client';

export const GET_ALL_POSTS = gql`
  query GetPosts($skip: Int!, $take: Int!) {
    getPosts(skip: $skip, take: $take) {
      id
      text
      video
      createdAt
      user {
        id
        fullname
        email
        image
        isFollowed
        canFollow
      }
      likes {
        id
        userId
        postId
      }
    }
  }
`;
