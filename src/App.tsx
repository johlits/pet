import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import React from 'react';
import logo from './logo.svg';
import './App.css';

import Stat from './Stat'

interface PetProps { }

type PetState = { text: string, name: string, sleeping: boolean };

const STATS = [
  { name: 'Hunger', value: 100, action: 'Feed', seconds: 0, timer: 2 },
  { name: 'Hygiene', value: 100, action: 'Shower', seconds: 0, timer: 8 },
  { name: 'Energy', value: 100, action: 'Sleep', seconds: 0, timer: 4 }];

class Pet extends React.Component<PetProps, PetState> {

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
    this.setState(state => ({
      name: this.state.text
    }));
  }

  render() {

    if (this.state.name.length < 1) {
      return <Form onSubmit={this.handleSubmit}><Form.Group>
        <Form.Label htmlFor="new-pet">
          Name your pet:
          </Form.Label>
          <Form.Control type="text" placeholder="Enter pet name" onChange={this.handleChange} value={this.state.text} />
        <Button variant="primary" type="submit">
          Create
        </Button>
        <Form.Text className="text-muted"><a href="https://github.com/johlits/pet">GitHub</a></Form.Text>
      </Form.Group>
      </Form>;
    }
    else {
      return <div><h1>{this.state.name}</h1>
        <Stat parentCallback={this.callbackFunction} name={STATS[0].name} action={STATS[0].action} timer={STATS[0].timer} disabled={this.state.sleeping}></Stat>
        <Stat parentCallback={this.callbackFunction} name={STATS[1].name} action={STATS[1].action} timer={STATS[1].timer} disabled={this.state.sleeping}></Stat>
        <Stat parentCallback={this.callbackFunction} name={STATS[2].name} action={STATS[2].action} timer={STATS[2].timer} disabled={this.state.sleeping}></Stat></div>;
    }
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          <Pet />
        </p>
      </header>
    </div>
  );
}

export default App;