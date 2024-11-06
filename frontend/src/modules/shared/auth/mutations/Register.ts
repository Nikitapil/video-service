import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
  mutation RegisterUser(
    $fullname: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
    $bio: String
  ) {
    register(
      registerInput: {
        fullname: $fullname
        email: $email
        password: $password
        confirmPassword: $confirmPassword
        bio: $bio
      }
    ) {
      user {
        id
        fullname
        email
        image
      }
    }
  }
`;
