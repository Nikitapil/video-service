import { gql } from '@apollo/client';

export const GET_USER_PROFILE = gql`
  query getUserProfile($userId: Int!) {
    getUserProfile(userId: $userId) {
      id
      fullname
      bio
      image
      email
      isFollowed
      canFollow
      isMyProfile
      posts {
        id
        text
        video
      }
    }
  }
`;
