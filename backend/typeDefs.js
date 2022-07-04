import {gql} from 'apollo-server-express'

const typeDefs=gql`

type Query {
  users(username: String!):[User]
  user(_id:ID!):User
  message:[Message]
  imessage(from:String!to:String!):[Message]
  myprofile:User
}

type User {
  _id:ID!
  username: String!
  email: String!
  latestMessage: MessageWithName
}

type Token {
  token: String
  _id: String
  username: String
}
scalar Date 
type Message{
     message:String!
     to:String!
     from:String!
     by:String!
     createdAt:Date!
 }

type MessageWithName{
  message:String!
  to:String!
     from:String!
     by:IdName
     createdAt:String!
}

 type IdName{
   _id:String
   username:String
 }

input MessageInput{
  message:String!
  from:String!
  to:String! 
}

input UserInput{
  username: String!
  email: String!
  password: String!
}

input UserSignIn{
  email: String!
  password: String!
}

type Mutation{
  signUpUser(userNew:UserInput!):User
  signInUser(userNew:UserSignIn!):Token
  createMessage(message:String! to:String! from:String!):Message
}

type Subscription {
  newMessage: Message
}
`
export default typeDefs 




