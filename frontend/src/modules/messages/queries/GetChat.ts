import { gql } from '@apollo/client';

export const GET_CHAT = gql`
  query GetChat($chatId: String!) {
    getChat(chatId: $chatId) {
      id
      messages {
        id
        chatId
        author {
          id
          fullname
          image
        }
        text
        createdAt
      }
    }
  }
`;
