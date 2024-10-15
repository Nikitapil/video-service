import { gql } from '@apollo/client';

export const CREATE_MESSAGE = gql`
  mutation CreateMessage($userId: Int!, $text: String!) {
    createMessage(CreateMesageInput: { userToId: $userId, text: $text }) {
      id
      chatId
    }
  }
`;
