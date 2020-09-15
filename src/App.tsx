import React from 'react';
import logo from './logo.svg';
import './App.css';

interface StatProps {
  name?: any;
  value?: any;
  action?: any;
  seconds?: any;
  timer?: any;
  disabled?: any;
  parentCallback?: any;
}

type StatState = { 
  value: any,
  seconds: any,
  disabled: any
};

class Stat extends React.Component<StatProps, StatState> {
  interval: any;
  constructor(props: any) {
    super(props)
    this.state = { value: 100, seconds: 0, disabled: this.props.disabled };
  }
  Increment = () => {
    this.setState({ value: this.state.value + 1 });
    this.sendData({ key: this.props.name, value: this.state.value, change: 1 });
  }
  Decrement = () => {
    this.setState({ value: this.state.value - 1 });
    this.sendData({ key: this.props.name, value: this.state.value, change: -1 });
  }

  tick() {
    if (this.state.seconds >= this.props.timer) {
      this.setState(state => ({
        seconds: 0
      }));
      if (this.state.disabled && this.props.name === 'Energy' && this.state.value < 100) {
        this.Increment();
      }
      else {
        this.Decrement();
      }
    }
    else {
      this.setState(state => ({
        seconds: state.seconds + 1
      }));
    }
  }

  sendData = (s: any) => {
    this.props.parentCallback(s);
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  componentDidUpdate(prevProps: { disabled: any }) {
    if (prevProps.disabled !== this.props.disabled) {
      this.setState({ disabled: this.props.disabled });
    }
  }
  
  render() {
    return <p>{this.props.name} : {this.state.value} <button onClick={this.Increment} disabled={this.state.disabled || this.state.value >= 100}>{this.props.action}</button></p>;
  }
}

interface PetProps {
  name?: string;
}

type PetState = { text: string, name: string, sleeping: boolean };

const STATS = [
  {name: 'Hunger', value: 100, action: 'Feed', seconds: 0, timer: 2}, 
  {name: 'Hygiene', value: 100, action: 'Shower', seconds: 0, timer: 8}, 
  {name: 'Energy', value: 100, action: 'Sleep', seconds: 0, timer: 4}];

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
      return <div><form onSubmit={this.handleSubmit}>
          <label htmlFor="new-pet">
            Name your pet: 
          </label>
          <input
            id="new-pet"
            onChange={this.handleChange}
            value={this.state.text}
          />
          <button>
            Create
          </button>
        </form><a href="https://github.com/johlits/pet">GitHub</a></div>;
    }
    else {
      return <div><h1>{this.state.name}</h1>
      <Stat parentCallback = {this.callbackFunction} name={STATS[0].name} action={STATS[0].action} timer={STATS[0].timer} disabled={this.state.sleeping}></Stat>
      <Stat parentCallback = {this.callbackFunction} name={STATS[1].name} action={STATS[1].action} timer={STATS[1].timer} disabled={this.state.sleeping}></Stat>
      <Stat parentCallback = {this.callbackFunction} name={STATS[2].name} action={STATS[2].action} timer={STATS[2].timer} disabled={this.state.sleeping}></Stat></div>;
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