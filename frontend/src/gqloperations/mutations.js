import {gql} from '@apollo/client'
export const SIGNUP_USER = gql`
mutation SignUpUser($userNew: UserInput!) {
    signUpUser(userNew: $userNew) {
      _id
      username
    }
  }
`

export const LOGIN_USER = gql`
mutation SignInUser($userNew: UserSignIn!) {
  signInUser(userNew: $userNew) {
    token
   _id
   username
  }
}
`
export const CREATE_MESSAGE = gql`
mutation CreateMessage($message: String!, $to: String!, $from: String!) {
  createMessage(message: $message, to: $to, from: $from) {
    message
    to
    from
    by
  }
}
`