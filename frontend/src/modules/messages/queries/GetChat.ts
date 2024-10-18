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
          email
        }
        text
        createdAt
        isMyMessage
      }
      chatWithUser {
        id
        fullname
        image
      }
    }
  }
`;
