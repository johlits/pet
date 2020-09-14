import React, { useState, useEffect } from 'react';
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

type PetState = { stats: any };

class Pet extends React.Component<PetProps, PetState> {
  constructor(props: any) {
    super(props);
    this.state = { stats: [{name: 'Hunger', value: 1000, action: 'Bathe', timer: 5}, {name: 'Hygiene', value: 1000, action: 'Shower', timer: 10}] };
  }
  render() {
    const statItems = this.state.stats.map((item: { name: any; value: any; action: any; timer: any; }) => 
      <Stat name={item.name} value={item.value} action={item.action} timer={item.timer}></Stat>);

    return <div><h1>{this.props.name}</h1>{statItems}</div>;
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          <Pet name={"bella"} />
        </p>
      </header>
    </div>
  );
}

export default App;
