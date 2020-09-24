import { MDBContainer, MDBRow } from 'mdbreact'
import React from 'react'

const About = () => {
    return <MDBContainer>
        <MDBRow className="row d-flex justify-content-center text-center"><p className="linkText">Made with React + Redux</p></MDBRow>
        <MDBRow className="row d-flex justify-content-center text-center"><a target="_blank" href="https://github.com/johlits/pet"><span className="linkText">GitHub</span></a></MDBRow>
        </MDBContainer>;
}

export default About