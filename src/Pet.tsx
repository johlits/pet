import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import { MDBContainer } from 'mdbreact';
import React from 'react';
import Stat from './Stat'

interface PetProps { }

type PetState = { text: string, name: string, sleeping: boolean };

const STATS = [
  { name: 'Hunger', value: 100, action: 'Feed', seconds: 0, timer: 2 },
  { name: 'Hygiene', value: 100, action: 'Shower', seconds: 0, timer: 8 },
  { name: 'Energy', value: 100, action: 'Sleep', seconds: 0, timer: 4 }];

export default class Pet extends React.Component<PetProps, PetState> {

  constructor(props: any) {
    super(props);
    this.state = { text: '', name: '', sleeping: false };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  callbackFunction = (childData: any) => {
    if (childData.key === 'Energy' && childData.change === 1) {
      this.setState({ sleeping: true });
    }
    else if (childData.key === 'Energy' && childData.change === -1) {
      this.setState({ sleeping: false });
    }
  }

  handleChange(e: { target: { value: any; }; }) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e: { preventDefault: () => void; }) {
    e.preventDefault();
    if (this.state.text.length === 0) {
      return;
    }
    this.setState({ name: this.state.text });
  }

  render() {

    if (this.state.name.length < 1) {
      return <Container className="mb-2"><Card bg="dark" text="light"><Card.Header as="h5">Create pet</Card.Header><Card.Text><Form onSubmit={this.handleSubmit}>
        <Form.Group>
          <Form.Row>
            <Col>
              <Form.Label htmlFor="new-pet">
                Name your pet:
              </Form.Label>
            </Col>
          </Form.Row>
          <Form.Row>
            <MDBContainer>
            <Form.Control type="text" placeholder="Enter pet name" onChange={this.handleChange} value={this.state.text} />
            <Button className="mt-1" variant="primary" type="submit">
                Create
              </Button>
            </MDBContainer>
          </Form.Row>
          <Form.Row className="align-items-center">
          </Form.Row>
        </Form.Group>
      </Form></Card.Text></Card></Container>;
    }
    else {
      return <Container className="mb-2"><Card bg="dark" text="light"><Card.Header as="h5">{this.state.name}</Card.Header><Card.Text>
        <Stat parentCallback={this.callbackFunction} name={STATS[0].name} action={STATS[0].action} timer={STATS[0].timer} disabled={this.state.sleeping}></Stat>
        <Stat parentCallback={this.callbackFunction} name={STATS[1].name} action={STATS[1].action} timer={STATS[1].timer} disabled={this.state.sleeping}></Stat>
        <Stat parentCallback={this.callbackFunction} name={STATS[2].name} action={STATS[2].action} timer={STATS[2].timer} disabled={this.state.sleeping}></Stat>
      </Card.Text></Card></Container>;
    }
  }
}