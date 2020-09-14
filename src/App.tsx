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
    this.state = { value: this.props.value, seconds: this.props.seconds, disabled: this.props.disabled };
  }
  Increment = () => {
    this.setState({ value: this.state.value + 1 });
    this.sendData({ key: this.props.name, value: this.state.value, change: 1, seconds: this.state.seconds});
  }
  Decrement = () => {
    this.setState({ value: this.state.value - 1 });
    this.sendData({ key: this.props.name, value: this.state.value, change: -1, seconds: this.state.seconds});
  }

  tick() {
    if (this.state.seconds >= this.props.timer) {
      this.setState(state => ({
        seconds: 0
      }));
      if (this.props.name === 'Energy' && this.state.disabled && this.state.value < 100) {
        this.Increment();
      }
      else if (this.state.value > 0) {
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
    return <p>{this.props.name} : {this.state.value} <button onClick={this.Increment} disabled={this.state.disabled}>{this.props.action}</button></p>;
  }
}

interface PetProps {
  name?: string;
}

type PetState = { text: string, name: string, stats: any, isSleeping: any };

class Pet extends React.Component<PetProps, PetState> {
  constructor(props: any) {
    super(props);
    this.state = { text: '', name: '', isSleeping: false, stats: [
      {name: 'Hunger', value: 100, action: 'Feed', seconds: 0, timer: 2, disabled: false}, 
      {name: 'Hygiene', value: 100, action: 'Shower', seconds: 0, timer: 8, disabled: false}, 
      {name: 'Energy', value: 100, action: 'Sleep', seconds: 0, timer: 4, disabled: true}] };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  callbackFunction = (childData: any) => {
    
    let tstats = this.state.stats;

    if (childData.key === 'Energy') {
      if (childData.change === 1 && childData.value < 100) {
        this.setState({ isSleeping: true });
      }
      else {
        this.setState({ isSleeping: false });
      }
    }
    
    for (var i in tstats) {
      if (tstats[i].name === childData.key) {
        tstats[i].seconds = childData.seconds;
        tstats[i].value = childData.value;
      }
      if (this.state.isSleeping) {
        tstats[i].disabled = true;
      }
      else {
        if (tstats[i].name === 'Energy' && tstats[i].value >= 100) {
          tstats[i].disabled = true;
        }
        else {
          tstats[i].disabled = false;
        }
      }
    }

    this.setState({ stats: tstats });
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
      const statItems = this.state.stats.map((item: { name: any; value: any; action: any; seconds: any; timer: any; disabled: any; }) => 
      <Stat parentCallback = {this.callbackFunction} name={item.name} value={item.value} action={item.action} seconds={item.seconds} timer={item.timer} disabled={item.disabled}></Stat>);

      return <div><h1>{this.state.name}</h1>{statItems}</div>;
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
