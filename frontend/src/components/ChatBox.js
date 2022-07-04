import { gql, useLazyQuery, useQuery, useSubscription } from "@apollo/client";
import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import loader from "../../src/loader.gif";
import { GET_ALL_MESSAGE, GET_ALL_USERS } from "../gqloperations/queries";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { Scrollbars } from "react-custom-scrollbars";
import Robot from "../robot.gif";
function ChatBox() {
  const [Loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  // const [, set] = useState("")
  const [User, setUser] = useState("");
  const [open, setOpen] = useState(false);
  const { loading, error, data } = useQuery(GET_ALL_USERS, {
    variables: { username: localStorage.getItem("userId") },
  });
  // const {loading: messageLoading,data: messageData}= useLazyQuery(GET_ALL_MESSAGE,{variables:{from:localStorage.getItem("userName")}})
  // const [imessage,{ loading: messageLoading,data: messageData}] = useLazyQuery(GET_ALL_MESSAGE)
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
  const { data: SubData } = useSubscription(GET_ALL_MESSAGES,{ onSubscriptionData: (data)=>{
    console.log("MESSAGE RECVEIVRD",data)
        }});
  const [imessage, { message1 }] = useLazyQuery(GET_ALL_MESSAGE);
  useEffect(() => {
    setOpen(false);
    console.log(SubData, "messageDataewrrtwerwer");
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  var name1;

  const handleClick = (name, uname) => {
    console.log("User", data);
    setOpen(true);
    // name.preventDefault()
    console.log("uname", uname);
    localStorage.setItem("to", uname);
    imessage({
      variables: { from: name, to: localStorage.getItem("userId") },
    });
    console.log(name);
    name1 = name;
    setUser(name1);
    // localStorage.setItem("to",User)
  };

  return (
    <Container>
      {Loading === true ? (
        <div className="d-flex justify-content-center mt-5">
          <img src={loader} alt="d" />
        </div>
      ) : (
        <Row classNameName="mt-4 ">
          <Col
            className="bg-transparent card mt-4 pt-4"
            style={{
              maxHeight: "550px",
              border: "4px solid gray",
              borderRadius: "10px",
              overflowX: "hidden",
              scrollBehavior: "smooth",
            }}
            sm={4}
          >
            <div className="input-group rounded mb-3">
              <input
                type="search"
                className="form-control rounded"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="search-addon"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Scrollbars style={{ width: "Auto", minHeight: "650px" }}>
              <ul className="list-unstyled mb-0">
                {data.users
                  ? data.users
                      .filter((e) => {
                        if (search === "") {
                          return e;
                        } else if (
                          e.username
                            .toLowerCase()
                            .includes(search.toLowerCase())
                        ) {
                          return e;
                        }
                      })
                      ?.map((user) => {
                        return (
                          <li key={user._id} className="p-2 border-bottom">
                            <div className="d-flex justify-content-between">
                              <div className="d-flex flex-row">
                                <div>
                                  <img
                                    onClick={() =>
                                      handleClick(user._id, user.username)
                                    }
                                    src={`https://ui-avatars.com/api/?name=${user.username}`}
                                    alt="avatar"
                                    className="d-flex align-self-center me-3"
                                    style={{ borderRadius: "100%" }}
                                    width="60"
                                  />
                                  <span className="badge bg-success badge-dot"></span>
                                </div>
                                <div className="pt-1">
                                  <p className="fw-bold mb-0 text-white">
                                    {user.username}
                                  </p>
                                  {/* <p className="fw-bold mb-0 text-white">{user.message.by}</p> */}
                                  {/* {
                                        user.message.map((i,index)=>{
                                          return(
                                          //  console.log(index[index.length-1])
                                              <p key={index} className="fw-bold mb-0 text-white">{i.message}</p>  
                                          )
                                        })
                                      } */}
                                </div>
                              </div>
                              <div className="pt-1">
                                <p className="small text-muted mb-1">
                                  Just now
                                </p>
                                <span className="badge bg-danger rounded-pill float-end">
                                  3
                                </span>
                              </div>
                            </div>
                          </li>
                        );
                      })
                  : ""}
              </ul>
            </Scrollbars>
          </Col>

          <Col
            className="bg-transparent card mt-4 pt-4"
            style={{
              maxHeight: "550px",
              border: "4px solid gray",
              borderRadius: "10px",
            }}
            sm={8}
          >
            {open === true ? (
              <>
                <div class="mb-2 d-flex">
                  <div>
                    <img
                      src={`https://ui-avatars.com/api/?name=${localStorage.getItem("to")}`}
                      alt="avatar"
                      className="d-flex align-self-center me-1"
                      style={{ borderRadius: "100%" }}
                      width="40"
                    />
                    <span className="badge bg-success badge-dot"></span>
                  </div>
                  <div className="pt-1">
                    <h4 className=" mx-3 text-white">
                      {localStorage.getItem("to")}
                    </h4>
                  </div>
                </div>
                <Scrollbars style={{ width: "Auto", maxHeight: "750px" }}>
                  <Messages userId={User} />
                  <p></p>
                </Scrollbars>
                <div class="mb-3 ">
                  <MessageInput userId={User}/>
                </div>
              </>
            ) : (
              <Container
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "white",
                  flexDirection: "column",
                }}
              >
                <img style={{ height: "20rem" }} src={Robot} alt="" />
                <h1>
                  Welcome,{" "}
                  <span style={{ color: "#4e0eff" }}>
                    {localStorage.getItem("userName")}
                  </span>
                </h1>
              </Container>
            )}
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default ChatBox;
