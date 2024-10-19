import { gql } from '@apollo/client';

export const OPEN_MESSAGES = gql`
  mutation OpenMessages($chatId: String!) {
    openChatMessages(chatId: $chatId) {
      message
    }
  }
`;
