import { gql, useMutation, useSubscription } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { CREATE_MESSAGE } from '../gqloperations/mutations'
import { GET_ALL_MESSAGE } from '../gqloperations/queries'

function MessageInput({userId}) {
 
useEffect(() => {
  console.log('localStorage.getItem("userId")', localStorage.getItem("userId"))
  console.log('localStorage.getItem("to")', localStorage.getItem("to"))
  console.log('Message', userId)
}, [])

    const [Message, setMessage] = useState("")
    const GET_ALL_MESSAGES = gql`
    subscription Subscription {
      newMessage {
        message
        to
        from
        by
      }
    }
`     
    const {data:subMessages} = useSubscription(GET_ALL_MESSAGES,{ onSubscriptionData: (data)=>{
      console.log("MESSAGE RECVEIVRD",data)
          }})
    // const [username, setUsername] = useState(localStorage.getItem("userName"))
    const [ createMessage,{data,loading,error}] = useMutation(CREATE_MESSAGE,{refetchQueries:
     [GET_ALL_MESSAGE,GET_ALL_MESSAGES]
    })

    const handleSubmit=(e)=>{
        e.preventDefault();
  console.log('message', Message)
  
    createMessage ({
        variables:{
          message:Message,
          to:userId,
          from:localStorage.getItem("userId")
        }
    }).then((res)=>{
        alert("added")
        console.log("datasssss",subMessages)
    }).catch((error)=>{
        alert(error.message)
    })
    setMessage("")
    }

  return (
    <div class="form-outline form-white d-flex">
    <input class="form-control mx-2" value={Message} onChange={(e)=> setMessage(e.target.value)} id="textAreaExample3" rows="2"></input>
    {/* <label class="form-label" for="textAreaExample3">Message</label> */}
    <button type="button" onClick={handleSubmit} class="btn btn-light btn-lg btn-rounded float-end">Send</button>
  </div>
  )
}

export default MessageInput



