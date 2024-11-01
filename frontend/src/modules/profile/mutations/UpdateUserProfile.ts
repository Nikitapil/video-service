import { gql } from '@apollo/client';

export const UPDATE_PROFILE = gql`
  mutation UpdateUserProfile($fullname: String, $bio: String, $email: String, $image: Upload) {
    updateUser(updateProfileInput: { fullname: $fullname, bio: $bio, email: $email }, image: $image) {
      id
      fullname
      bio
      image
      email
    }
  }
`;
