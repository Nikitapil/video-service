import { gql } from '@apollo/client';

export const TOGGLE_USER_FOLLOW = gql`
  mutation ToggleUserFollow($userToFollowId: Int!) {
    toggleUserFollow(userToFollowId: $userToFollowId) {
      isFollowed
    }
  }
`;
