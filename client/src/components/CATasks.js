import React, {Component} from 'react';
import '../App.css';
import {Container, ListGroup, ListGroupItem, Button, Modal, ModalHeader, ModalBody, ModalFooter , Form, FormGroup, Label, Input, FormText} from 'reactstrap';
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import {connect} from 'react-redux'
import {getMyTasks,getApplicants} from '../actions/ConsultancyAgencyActions'
import PropTypes from 'prop-types'
import CASidenav from './CASidenav';

class CATasks extends Component{
    
 state = {
    modal: false,
      } 

onTaskClick=(pid,_id)=>{
    this.props.getApplicants(pid,_id)
    this.toggle()
}

toggle=()=>{
    this.setState(prevState => ({modal:!prevState.modal
    }))
  }

render(){
this.props.getMyTasks();
const {mytasks}=this.props.ca
const {taskapplicants}=this.props.ca

    return(
    <Container  >
        <CASidenav></CASidenav>
        <h1> My Assigned Tasks </h1>
        <br/>
        <ListGroup >
            <TransitionGroup className="mytask-list">
            {mytasks.map( item => (
               <CSSTransition key={item._id} timeout={500} >
               <ListGroupItem >
                <Button block outline onClick={this.onTaskClick.bind(this,item.pid,item.taskID)} color= "warning" >{item.name} </Button>
                   
                </ListGroupItem>
                </CSSTransition>
          ))}
            </TransitionGroup>
        </ListGroup>
        <br/>
    <Modal isOpen= {this.state.modal} toggle={this.toggle}>
       <ModalHeader toggle={this.toggle}>
       Task Applicants
       </ModalHeader>
           <ModalBody>
               <ListGroup>
                { 
                    taskapplicants.map( applicant => (
                    <CSSTransition key={applicant} timeout={500} >
                    <ListGroupItem >
                    <Button block >{applicant.name} {applicant.email} </Button>
                        
                    </ListGroupItem>
                </CSSTransition>  ))}   
                 </ListGroup>    
             </ModalBody>
       </Modal>

    </Container>
 

    );
}

}

CATasks.propTypes={

 getMyTasks:PropTypes.func.isRequired
}
const mapStateToProps = (state) =>
({
    ca: state.ca
});

export default connect(mapStateToProps, {getMyTasks,getApplicants})(CATasks)