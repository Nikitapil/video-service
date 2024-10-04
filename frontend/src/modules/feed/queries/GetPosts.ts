import { gql } from '@apollo/client';

export const GET_ALL_POSTS = gql`
  query GetPosts($skip: Int!, $take: Int!, $search: String) {
    getPosts(skip: $skip, take: $take, search: $search) {
      id
      text
      video
      createdAt
      tags
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
