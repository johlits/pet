import Button from 'react-bootstrap/Button';
import React from 'react';
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import logo from './logo.svg';
import './App.css';

import Pet from './Pet'

interface PetContainerProps { }

type PetContainerState = { pets: number };

class PetContainer extends React.Component<PetContainerProps, PetContainerState> {

  constructor(props: any) {
    super(props);
    this.state = { pets: 0 };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ pets: this.state.pets + 1 });
  }

  render() {

    let pets = [];
    for (let i = 0; i < this.state.pets; i++) {
      pets.push(<Pet key={i} />);
    }

    return <header className="App-header"><Navbar fixed="top" bg="dark" variant="dark" expand="lg"><Navbar.Brand href="#home">PetPaw</Navbar.Brand></Navbar>{pets}<Button variant="success" onClick={this.handleClick}>Add pet</Button><Nav.Link href="https://github.com/johlits/pet"><small className="linkText">GitHub</small></Nav.Link></header>;
  }
}

function App() {
  return (
    <div className="App">
      <PetContainer />
    </div>
  );
}

export default App;