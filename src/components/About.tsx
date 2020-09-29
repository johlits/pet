import Button from "react-bootstrap/Button";
import React, { useState, useEffect } from "react";
import { MDBContainer, MDBRow } from "mdbreact";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { css } from "@emotion/core";
import PulseLoader from "react-spinners/PulseLoader";

const override = css`
  display: block;
  margin: 0 auto;
`;

const About = () => {
  const [count, setCount] = useState(50);
  const [quote, setQuote] = useState("");

  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const handleDecrement = () => {
    setCount((prevCount) => prevCount - 1);
  };

  useEffect(() => {
    setQuote('');
    const API =
      "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/";
    fetch(API)
      .then((response) => response.json())
      .then((data) => {
        setQuote(data.quotes[count].quote);
      })
      .catch((error) => console.log("Error", error));
  }, [count]);

  return (
    <MDBContainer className="linkText">
      <MDBRow className="row d-flex justify-content-center text-center">
        <h4>About!</h4>
      </MDBRow>
      <MDBRow className="row d-flex justify-content-center text-center">
        <p>Made with React + Redux</p>
      </MDBRow>
      <MDBRow className="row d-flex justify-content-center text-center">
        Source code:&nbsp;
        <a href="https://github.com/johlits/pet">
          GitHub
        </a>
      </MDBRow>
      <MDBRow className="row d-flex justify-content-center text-center mt-4">
        <Container>
          <Row>
            <Col xs={6}>Hooks & API: </Col>
            <Col>
              <Button className="btn-block" onClick={handleIncrement}>
                +
              </Button>
            </Col>
            <Col>{count}</Col>
            <Col>
              <Button className="btn-block" onClick={handleDecrement}>
                -
              </Button>
            </Col>
          </Row>
        </Container>
      </MDBRow>
      <MDBRow className="row d-flex justify-content-center text-center mt-2">
        <i>{quote === '' ? <PulseLoader
          css={override}
          size={32}
          color={"#ffffff"}
          loading={true}
        /> : quote}</i>
      </MDBRow>
    </MDBContainer>
  );
};

export default About;
