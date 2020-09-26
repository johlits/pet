import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import { MDBContainer } from "mdbreact";
import React from "react";
import { connect } from "react-redux";
import Stat from "./Stat";
import { deletePet, updatePet } from "../redux/actions";
import ProgressBar from "react-bootstrap/ProgressBar";

interface PetProps {
  parentCallback: any;
  id: number;
  name: string;
  hunger: number;
  hygiene: number;
  energy: number;
  asleep: boolean;
  deletePet: any;
  updatePet: any;
  age: number;
  seconds: number;
}

type PetState = {
  text: string;
  name: string;
  hunger: number;
  hygiene: number;
  energy: number;
  asleep: boolean;
  age: number;
  seconds: number;
};

class Pet extends React.Component<PetProps, PetState> {
  interval: any;

  constructor(props: any) {
    super(props);
    this.state = {
      text: "",
      name: "",
      hunger: 100,
      hygiene: 100,
      energy: 100,
      asleep: false,
      age: 1,
      seconds: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  Remove = () => {
    this.props.deletePet(this.props.id);
  };

  sendData = (s: any) => {
    this.props.parentCallback(s);
  };

  callbackFunction = (childData: any) => {
    if (childData.key === "Energy") {
      if (childData.change === 1) {
        if (childData.value >= 100) {
          this.setState({ asleep: false, energy: childData.value });
        } else {
          this.setState({ asleep: true, energy: childData.value });
        }
      } else {
        this.setState({ asleep: false, energy: childData.value });
      }
    }

    if (childData.key === "Hunger") {
      this.setState({ hunger: childData.value });
    }

    if (childData.key === "Hygiene") {
      this.setState({ hygiene: childData.value });
    }

    this.props.updatePet({
      id: this.props.id,
      name: this.state.name,
      hunger: this.state.hunger,
      hygiene: this.state.hygiene,
      energy: this.state.energy,
      asleep: this.state.asleep,
      seconds: this.state.seconds,
      age: this.state.age,
    });
  };

  tick() {
    if (this.state.seconds >= 100) {
      let age = this.state.age + 1;
      this.setState((state) => ({
        seconds: 0,
        age: age,
      }));
    } else {
      if (this.state.hunger > 0 && this.state.hygiene > 0 && this.state.energy > 0) {
        this.setState((state) => ({
          seconds: state.seconds + 1,
        }));
      }
    }
  }

  handleChange(e: { target: { value: any } }) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
    if (this.state.text.length === 0) {
      return;
    }
    this.setState({
      name: this.state.text,
      hunger: 80,
      hygiene: 90,
      energy: 100,
      asleep: false,
      age: 1,
      seconds: 0,
    });
    this.props.updatePet({
      id: this.props.id,
      name: this.state.text,
      hunger: 80,
      hygiene: 90,
      energy: 100,
      asleep: false,
      age: 1,
      seconds: 0,
    });
  }

  componentDidMount() {
    this.setState({
      name: this.props.name,
      hunger: this.props.hunger,
      hygiene: this.props.hygiene,
      energy: this.props.energy,
      asleep: this.props.asleep,
      seconds: this.props.seconds,
      age: this.props.age,
    });
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    if (this.state.name.length < 1) {
      return (
        <Container className="mb-2">
          <Card bg="dark" text="light">
            <Card.Header as="h5">
              <Container>
                <Row>
                  <Col>
                    <Button
                      className="float-left"
                      variant="danger"
                      onClick={this.Remove}
                    >
                      Delete
                    </Button>
                  </Col>
                  <Col md="auto">Create pet</Col>
                  <Col></Col>
                </Row>
              </Container>
            </Card.Header>
            <Card.Text>
              <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                  <Form.Row>
                    <Col>
                      <Form.Label htmlFor="new-pet">Name your pet:</Form.Label>
                    </Col>
                  </Form.Row>
                  <Form.Row>
                    <MDBContainer>
                      <Form.Control
                        type="text"
                        placeholder="Enter pet name"
                        onChange={this.handleChange}
                        value={this.state.text}
                      />
                      <Button className="mt-1" variant="primary" type="submit">
                        Create
                      </Button>
                    </MDBContainer>
                  </Form.Row>
                  <Form.Row className="align-items-center"></Form.Row>
                </Form.Group>
              </Form>
            </Card.Text>
          </Card>
        </Container>
      );
    } else {
      return (
        <Container className="mb-2">
          <Card bg="dark" text="light">
            <Card.Header as="h5">
              <Container>
                <Row>
                  <Col>
                    <Button
                      className="float-left"
                      variant="danger"
                      onClick={this.Remove}
                    >
                      Delete
                    </Button>
                  </Col>
                  <Col md="auto">
                    <Link to={"/pet/" + this.props.id}>
                      <h4 className="linkText">
                        {this.state.name}
                        {this.state.asleep ? " (Sleeping)" : ""}
                      </h4>
                    </Link>
                  </Col>
                  <Col>
                    <h5 className="linkText float-right">
                      Age: {this.state.age}
                    </h5>
                  </Col>
                </Row>
              </Container>
            </Card.Header>
            <Card.Text className="mb-1 mt-1">
              <Stat
                parentCallback={this.callbackFunction}
                name="Hunger"
                action="Feed"
                disabled={this.state.asleep}
                pid={this.props.id}
                val={this.state.hunger}
              ></Stat>
              <Stat
                parentCallback={this.callbackFunction}
                name="Hygiene"
                action="Shower"
                disabled={this.state.asleep}
                pid={this.props.id}
                val={this.state.hygiene}
              ></Stat>
              <Stat
                parentCallback={this.callbackFunction}
                name="Energy"
                action="Sleep"
                disabled={this.state.asleep}
                pid={this.props.id}
                val={this.state.energy}
              ></Stat>
              <ProgressBar
                now={this.state.seconds}
                label={`${this.state.seconds}%`}
              />
            </Card.Text>
          </Card>
        </Container>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  let petData = state.pets.pets.find((pet) => pet.id === ownProps.id);
  console.log(petData);
  return {
    id: petData.id,
    name: petData.name,
    hunger: petData.hunger,
    hygiene: petData.hygiene,
    energy: petData.energy,
    asleep: petData.asleep,
    age: petData.age,
    seconds: petData.seconds,
  };
};

export default connect(mapStateToProps, { deletePet, updatePet })(Pet);
