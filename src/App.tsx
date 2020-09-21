import Button from 'react-bootstrap/Button';
import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import { MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import './App.css';

import Pet from './Pet'

var ls = require('local-storage');

interface PetContainerProps { }

type PetContainerState = { pets: any, petId: number };

class PetContainer extends React.Component<PetContainerProps, PetContainerState> {

  constructor(props: any) {
    super(props);
    this.state = { pets: [], petId: 1 };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    let pets = [...this.state.pets, this.state.petId];
    let petId = this.state.petId + 1;
    this.setState({ pets: pets, petId: petId });
    ls.set('pets', pets);
    ls.set('petId', petId);
  }

  callbackFunction = (childData: any) => {
    let pets = this.state.pets.filter((x: any) => x !== childData.id);
    this.setState({ pets: pets });
    ls.set('pets', pets);
  }

  componentDidMount() {
    let pets = ls.get('pets') || [];
    this.setState({ pets: pets, petId: ls.get('petId') });

    // remove deleted pets from local storage
    let toRemove = [];
    if (localStorage != null) {
      for (let i = 0; i < localStorage.length; i++){
        let key = localStorage.key(i);
        let no = key == null ? '' : key.replace(/\D/g,'');
        if (no.length > 0) {
          if (!pets.includes(parseInt(no))) {
            toRemove.push(key);
          }
        }
      }
    }
    for (let i = 0; i < toRemove.length; i++) {
      console.log("removing " + toRemove[i]);
      ls.remove(toRemove[i]);
    }
  }

  render() {

    let pets = [];
    for (let i = 0; i < this.state.pets.length; i++) {
      pets.push(<Pet parentCallback={this.callbackFunction} key={this.state.pets[i]} id={this.state.pets[i]} />);
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