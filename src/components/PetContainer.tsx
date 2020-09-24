import Button from 'react-bootstrap/Button'
import { RouteComponentProps } from 'react-router';
import React from 'react'
import { connect } from "react-redux";
import { MDBContainer, MDBRow, MDBFooter, MDBNavItem, MDBNavLink, MDBNavbarNav, MDBCollapse, MDBNavbarToggler } from 'mdbreact'
import '../App.css'

import Pet from './Pet'
import { addPet } from "../redux/actions";

interface PetContainerProps { pets: any, addPet: any }

interface IReactRouterParams {
    pet_id: string;
  }

class PetContainer extends React.Component<PetContainerProps & RouteComponentProps<IReactRouterParams>> {

  constructor(props: any) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.addPet('')
  }

  callbackFunction = (childData: any) => {
  }

  componentDidMount() {
  }

  render() {

    let petObjs = this.props.pets;
    let pets : JSX.Element[] = [];
    for (let i = 0; i < petObjs.length; i++) {
      pets.push(<Pet parentCallback={this.callbackFunction} key={petObjs[i].id} id={petObjs[i].id} name={petObjs[i].name} hunger={petObjs[i].hunger} hygiene={petObjs[i].hygiene} sleep={petObjs[i].sleep} />);
    }

    return <MDBContainer><MDBRow>{pets}</MDBRow><MDBRow className="row d-flex justify-content-center text-center"><Button variant="success" onClick={this.handleClick}>Add pet</Button></MDBRow></MDBContainer>;
  }
}

const mapStateToProps = (state, ownProps) => {
  let id = ownProps.match.params.pet_id === undefined ? NaN : parseInt(ownProps.match.params.pet_id);
  if (isNaN(id)) {
    return { 
      pets: state.pets.pets
    }
  }
  return { 
    pets: state.pets.pets.filter(pet => pet.id === id)
  }
}

export default connect(mapStateToProps, { addPet })(PetContainer);