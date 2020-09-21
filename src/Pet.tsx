import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { MDBContainer } from 'mdbreact';
import React from 'react';
import Stat from './Stat'

var ls = require('local-storage');

interface PetProps { parentCallback: any; id: number }

type PetState = { text: string, name: string, sleeping: boolean };

const STATS = [
  { name: 'Hunger', value: 100, action: 'Feed', seconds: 0, timer: 2 },
  { name: 'Hygiene', value: 100, action: 'Shower', seconds: 0, timer: 8 },
  { name: 'Energy', value: 100, action: 'Sleep', seconds: 0, timer: 4 }];

export default class Pet extends React.Component<PetProps, PetState> {

  constructor(props: any) {
    super(props);
    console.log(this.props);
    this.state = { text: '', name: '', sleeping: false };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  Remove = () => {
    this.sendData({ id: this.props.id });
  }

  sendData = (s: any) => {
    this.props.parentCallback(s);
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
    ls.set('p' + this.props.id, this.state.text);
  }

  componentDidMount() {
    this.setState({ name: ls.get('p' + this.props.id) || '' });
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
      return <Container className="mb-2"><Card bg="dark" text="light"><Card.Header as="h5">
        <Container>
          <Row>
    <Col><Button className="float-left" variant="danger" onClick={this.Remove}>Delete</Button></Col>
    <Col md="auto">{this.state.name}</Col>
    <Col>
    </Col>
  </Row>
</Container>
        
        </Card.Header><Card.Text className="mb-1 mt-1">
        <Stat parentCallback={this.callbackFunction} name={STATS[0].name} action={STATS[0].action} timer={STATS[0].timer} disabled={this.state.sleeping} pid={this.props.id}></Stat>
        <Stat parentCallback={this.callbackFunction} name={STATS[1].name} action={STATS[1].action} timer={STATS[1].timer} disabled={this.state.sleeping} pid={this.props.id}></Stat>
        <Stat parentCallback={this.callbackFunction} name={STATS[2].name} action={STATS[2].action} timer={STATS[2].timer} disabled={this.state.sleeping} pid={this.props.id}></Stat>
      </Card.Text></Card></Container>;
    }
  }
}