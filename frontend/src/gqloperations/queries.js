import { gql } from "@apollo/client";
export const GET_ALL_MESSAGE = gql`
  query Imessage($from: String!, $to: String!) {
    imessage(from: $from, to: $to) {
      message
      to
      from
      by
      createdAt
    }
  }
`;

export const GET_ALL_USERS = gql`
  query Users($username: String!) {
    users(username: $username) {
      _id
      username
      email
      latestMessage {
        message
        to
        from
        by {
          _id
          username
        }
        createdAt
      }
    }
  }
`;

export const GET_MY_PROFILE = gql`
  query Myprofile {
    myprofile {
      _id
      username
      email
      message {
        message
        by {
          _id
          username
        }
      }
    }
  }
`;
