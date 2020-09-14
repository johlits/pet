import React from 'react';
import logo from './logo.svg';
import './App.css';

interface StatProps {
  name?: any;
  value?: any;
  action?: any;
  timer?: any;
}

type StatState = { 
  value: any,
  seconds: any
};

class Stat extends React.Component<StatProps, StatState> {
  interval: any;
  constructor(props: any) {
    super(props)
    this.state = { value: this.props.value, seconds: 0 };
  }
  Increment = () => {
    this.setState({ value: this.state.value + 1 });
  }
  Decrement = () => {
    this.setState({ value: this.state.value - 1 });
  }

  tick() {
    if (this.state.seconds >= this.props.timer) {
      this.setState(state => ({
        seconds: 0
      }));
      this.Decrement();
    }
    else {
      this.setState(state => ({
        seconds: state.seconds + 1
      }));
    }
    
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  
  render() {
  return <p>{this.props.name} : {this.state.value} <button onClick={this.Increment}>{this.props.action}</button></p>;
  }
}

interface PetProps {
  name?: string;
}

type PetState = { text: string, name: string, stats: any };

class Pet extends React.Component<PetProps, PetState> {
  constructor(props: any) {
    super(props);
    this.state = { text: '', name: '', stats: [
      {name: 'Hunger', value: 100, action: 'Feed', timer: 5}, 
      {name: 'Hygiene', value: 100, action: 'Shower', timer: 10}, 
      {name: 'Energy', value: 100, action: 'Sleep', timer: 20}] };
      
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
      return <form onSubmit={this.handleSubmit}>
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
        </form>;
    }
    else {
      const statItems = this.state.stats.map((item: { name: any; value: any; action: any; timer: any; }) => 
      <Stat name={item.name} value={item.value} action={item.action} timer={item.timer}></Stat>);

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
