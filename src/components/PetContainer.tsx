import Button from 'react-bootstrap/Button'
import { RouteComponentProps } from 'react-router';
import React from 'react'
import { MDBContainer, MDBRow, MDBFooter, MDBNavItem, MDBNavLink, MDBNavbarNav, MDBCollapse, MDBNavbarToggler } from 'mdbreact'
import '../App.css'

import Pet from './Pet'

var ls = require('local-storage');

interface PetContainerProps { }

type PetContainerState = { pets: any, petId: number, singlePet: number };

interface IReactRouterParams {
    pet_id: string;
  }

class PetContainer extends React.Component<PetContainerProps & RouteComponentProps<IReactRouterParams>, PetContainerState> {

  constructor(props: any) {
    super(props);
    this.state = { pets: [], petId: 1, singlePet: NaN };
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
    let toRemove : string[] = [];
    if (localStorage != null) {
      for (let i = 0; i < localStorage.length; i++){
        let key = String(localStorage.key(i));
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

    this.setState({ singlePet: this.props.match.params.pet_id === undefined ? NaN : parseInt(this.props.match.params.pet_id) });
  }

  render() {

    let pets : JSX.Element[] = [];
    for (let i = 0; i < this.state.pets.length; i++) {
        if (isNaN(this.state.singlePet)) {
            pets.push(<Pet parentCallback={this.callbackFunction} key={this.state.pets[i]} id={this.state.pets[i]} />);
        }
        else if (this.state.pets[i] === this.state.singlePet) {
            pets.push(<Pet parentCallback={this.callbackFunction} key={this.state.pets[i]} id={this.state.pets[i]} />);
        }
    }

    return <MDBContainer><MDBRow>{pets}</MDBRow><MDBRow className="row d-flex justify-content-center text-center"><Button variant="success" onClick={this.handleClick}>Add pet</Button></MDBRow></MDBContainer>;
  }
}

export default PetContainer