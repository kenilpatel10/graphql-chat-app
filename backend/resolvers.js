import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PubSub, withFilter } from 'graphql-subscriptions';


const pubsub = new PubSub();
const User = mongoose.model("User");
const Message = mongoose.model("Message");

const resolvers = {
  Query: {
    users: async (_,{username}) =>{
      let users = await User.find({ _id: { $ne: username } })
      const allUserMessages = await Message.find({
   
          $or: [{ from:username }, { to: username }],
           $sort : { createdAt : -1, from: -1, message:-1 } 
      })
      console.log('otherUser', allUserMessages)
      // users = users.map((otherUser) => {
        
      //   const latestMessage = allUserMessages.find(
      //     (m) => m.from === otherUser._id || m.to === otherUser._id
      //   )
      //   console.log(latestMessage)
      //   otherUser.latestMessage = latestMessage
      //   return otherUser
        
      // })
      return users
    } ,


    user: async (_, { _id }) => await User.findOne({ _id }),
    message: async () => await Message.find({}).populate("by" ,"_id username"  ),
    imessage: async (_, { from, to}, { userId }) => {

        // if(!userId) throw new Error("You must be logged in")

        const otherUser = await User.findOne({userid: from})
        if (!otherUser) throw new UserInputError('User not found')
console.log(from)
        const userids = [to,from]
console.log('userids',from,to)
        const messages = await Message.find({
    
            from: { $in: userids },
            to: { $in: userids },
         
        })

        return messages;
    },

    myprofile:async (_,args,{userId})=>{
      if(!userId) throw new Error("You must be logged in")
      return await User.findOne({_id:userId})
     }
  },
 
  Mutation: {
    signUpUser: async (_, { userNew }) => {
      const user = await User.findOne({ email: userNew.email });
      const username = await User.findOne({ username: userNew.username });
      if (user) {
        throw new Error("User alredy exists");
      }
      if (username) {
        throw new Error("Username already exists, please use another");
      }
      const hashedPassword = await bcrypt.hash(userNew.password, 12);

      const newUser = new User({
        ...userNew,
        password: hashedPassword,
      });
      return await newUser.save();
    },


    signInUser: async (_, { userNew }) => {
      const user = await User.findOne({ email: userNew.email });

      if (!user) {
        throw new Error("User doesn't exists");
      }
      const comparePassword = await bcrypt.compare(
        userNew.password,
        user.password
      );
      
      if (!comparePassword) {
        throw new Error("Invalid email or password");
      }
  
      const token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{
        expiresIn:"60d"
      });
      console.log("user", user)
      console.log('jwt ', token)
      return {_id:user._id,username:user.username,token};
    },

    createMessage: async (_, {message,to,from}, { userId }) => {
      console.log("first",userId)
      // if (!userId) {
      //   throw new Error("Login to access this resource");
      // }
      const newMessage = await Message.create({
        message,
        to,
        from,
        by:"629719d78f84eafe7e767079"
      })

      pubsub.publish('NEW_MESSAGE',{newMessage : newMessage});
      return await newMessage;
    },
  },

    Subscription:{
        newMessage:{
          subscribe: withFilter(() => pubsub.asyncIterator(['NEW_MESSAGE']),({newMessage},_,{userId})=>{
            console.log('userId', userId)
            if(newMessage.from === newMessage.by || newMessage.to === newMessage.by ){
            return true;
            }
            return false;
          })
        }
      }
    };

export default resolvers;

