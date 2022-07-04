import { gql, useLazyQuery, useQuery, useSubscription } from "@apollo/client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { GET_ALL_MESSAGE, GET_MY_PROFILE } from "../gqloperations/queries";
import MessageInput from "./MessageInput";
import * as moment from "moment";

function Messages({ userId }) {
  const message1 = useQuery(GET_ALL_MESSAGE, {
    variables: { from: userId, to: localStorage.getItem("userId") },
  });
  console.log("message1", message1.data);
  const sent = localStorage.getItem("userId");
  const message2 = useMemo(() => {
    return message1?.data;
  }, [message1.data]);
  console.log("message2", message2);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [message2]);
  // const [User, setUser] = useState("harsh")
  const GET_ALL_MESSAGES = gql`
    subscription Subscription {
      newMessage {
        message
        to
        from
        by
      }
    }
  `;


  const { data } = useSubscription(GET_ALL_MESSAGES, {
    onSubscriptionData: (data) => {
      console.log("MESSAGE ", data);
    },
  });

  useEffect(() => {
    // imessage({variables:{from: "kenil",to:"harsh" }})
    // console.log(GET_ALL_MESSAGE)
    console.log(data, "messageData")
  }, []);

  return (
    <div>
      <ul className="list-unstyled text-black ">
        {message2?.imessage.map((msg) => {
          return (
            <div key={msg._id}>
              {sent === msg.from ? (
                <li className="d-flex justify-content-end mb-4">
                  <div className="card mask-custom w-100">
                    <div
                      className="card-header d-flex justify-content-between p-3"
                      style={{
                        borderBottom: "1px solid rgba(255,255,255,.3)",
                      }}>
                      <p className="fw-bold mb-0">You</p>
                      <p className="text-dark small mb-0">
                        <i className="far fa-clock"></i>
                        {moment(msg.createdAt).format("LT")}
                      </p>
                    </div>
                    <div className="card-body">
                      <p className="mb-0">{msg.message}</p>
                    </div>
                  </div>
                  <img src={`https://ui-avatars.com/api/?name=${localStorage.getItem("userName")}}`}
                    alt="avatar"
                    className="rounded-circle d-flex align-self-start ms-3 shadow-1-strong"
                    width="60"
                  />
                </li>
              ) : (
                <li className="d-flex justify-content-start mb-4">
                  <img
                    src={`https://ui-avatars.com/api/?name=${localStorage.getItem("to")}`}
                    alt="avatar"
                    className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                    width="60"
                  />
                  <div className="card mask-custom w-100">
                    <div
                      className="card-header d-flex justify-content-between p-3"
                      style={{
                        borderBottom: " 1px solid rgba(255,255,255,.3)",
                      }}
                    >
                      <p className="fw-bold mb-0">
                        {localStorage.getItem("to")}
                      </p>
                      <p className="text-dark small mb-0">
                        <i className="far fa-clock"></i>
                        {moment(msg.createdAt).format("LT")}
                      </p>
                    </div>
                    <div className="card-body">
                      <p className="mb-0">{msg.message}</p>
                    </div>
                  </div>
                </li>
              )}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </ul>
    </div>
  );
}

export default Messages;
