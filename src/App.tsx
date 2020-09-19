import Button from 'react-bootstrap/Button';
import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import { MDBContainer, MDBRow, MDBFooter } from "mdbreact";
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

    return <MDBContainer><MDBRow>{pets}</MDBRow><MDBRow className="row d-flex justify-content-center text-center"><Button variant="success" onClick={this.handleClick}>Add pet</Button></MDBRow></MDBContainer>;
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header"><Navbar fixed="top" bg="dark" variant="dark" expand="lg"><Navbar.Brand href="#home">PetPaw</Navbar.Brand></Navbar>
      </header>
      <main role='main' className='flex-shrink-0'>
      <PetContainer /></main>
      <footer className='footer mt-auto py-3 text-white fixed-bottom'>
      <MDBFooter color="blue" className="font-small"><div className="footer-copyright text-center py-1">
        <MDBContainer fluid>
        <a href="https://github.com/johlits/pet"><span className="linkText">GitHub</span></a> &copy; {new Date().getFullYear()}
        </MDBContainer>
      </div></MDBFooter></footer>
      
      
    </div>
  );
}

export default App;