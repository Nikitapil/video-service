import {gql} from "@apollo/client";

export const GET_POSTS_BY_USER_ID = gql`
    query getPostsByUserId($userId: Int!) {
        getPostsByUserId(userId: $userId) {
            id
            text
            video
            createdAt
            user {
                fullname
                email
                id
            }
        }
    }
`