import { gql } from '@apollo/client';

export const GET_CHATS_LIST_QUERY = gql`
  query GetChatsList {
    getChatList {
      id
      lastMessage {
        id
        author {
          fullname
        }
        text
      }
      chatWithUser {
        id
        fullname
        image
      }
      unreadMessagesCount
    }
  }
`;
