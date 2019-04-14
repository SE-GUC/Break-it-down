import React, {Component} from 'react';
import '../App.css';
import {Container, ListGroup, ListGroupItem, Button, Modal, ModalHeader, ModalBody, ModalFooter , Form, FormGroup, Label, Input, FormText} from 'reactstrap';
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import {connect} from 'react-redux'
import {getApplicants} from '../actions/ConsultancyAgencyActions'
import PropTypes from 'prop-types'
import uuid from 'uuid'

class CATaskApplicantModal extends Component{

 state = {
    modal: false,
      } 
componentDidMount(){
}
onTaskClick =(_idp,_idt) =>{
  this.toggle();
 this.props.getApplicants(_idp,_idt);
}
render(){
    this.props.getApplicants();
const {taskapplicants}=this.props.ca
console.log(taskapplicants)
    return(
            <Container>
        <Modal isOpen= {this.state.modal} toggle={this.toggle}>
       <ModalHeader toggle={this.toggle}>
       Task Applicants
       </ModalHeader>
           <ModalBody>
               <ListGroup>
                {taskapplicants.map( applicant => (
                    <CSSTransition key={applicant._id} timeout={500} >
                    <ListGroupItem >
                    <Button block >{applicant.name} {applicant.email} </Button>
                        
                    </ListGroupItem>
                </CSSTransition>  ))}   
                 </ListGroup>    
             </ModalBody>
       </Modal>
                    </Container>
    )
}


   
}
CATaskApplicantModal.propTypes={
  getApplicants: PropTypes.func.isRequired
 }
const mapStateToProps = state => ({

    ca: state.ca
})
export default connect(mapStateToProps,{ getApplicants})(CATaskApplicantModal)
