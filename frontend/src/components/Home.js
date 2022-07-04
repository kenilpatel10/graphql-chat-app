import React from "react";
import image from "../../src/chat1.png";
import { Col, Nav, Row, Tab, Tabs } from "react-bootstrap";
import Login from "./login";
import Register from "./register";
import image2 from "../../src/CHAT.png";

function Home() {
  return (
    <div className="back">
      <div className="container">
        <Row>
          <Col sm={6}>
            <h2 className="mt-4  text-white ml-0">
              {" "}
              <img
                style={{ height: "70px", width: "70px", marginLeft: "-60px" }}
                src={image2}
                alt=""
              />{" "}
              Social App
            </h2>
            <img style={{
                width: "80%",
                marginTop: "40px",
                height: "auto",
                objectFit: "cover",
              }}
              className="img-fluid hero animated "
              src={image}
              alt="d"
            />
          </Col>
          <Col sm={6} className="mt-4 p-5" style={{ color: "white" }}>
            <div
              style={{
                border: "2px solid lightgrey",
                borderTop: "none",
                borderRadius: "10px",
                backgroundColor: "#141E30",
              }}
            >
              <Tabs
                style={{ border: "none" }}
                fill
                defaultActiveKey="profile"
                id="uncontrolled-tab-example"
                className="mb-3"
              >
                <Tab eventKey="home" title="Login">
                  <Login />
                </Tab>
                <Tab eventKey="profile" title="Register">
                  <Register />
                </Tab>
              </Tabs>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Home;
