import { gql } from '@apollo/client';

export const UPDATE_PROFILE = gql`
  mutation ChangePassword($oldPassword: String!, $newPassword: String!, $confirmPassword: String!) {
    changePassword(
      changePasswordInput: { oldPassword: $oldPassword, newPassword: $newPassword, confirmPassword: $confirmPassword }
    ) {
      message
    }
  }
`;
