import React, {Component} from 'react';
import '../App.css';
import { withRouter } from 'react-router-dom';
import {Container, ListGroup, ListGroupItem, Button, Modal, ModalHeader, ModalBody, ModalFooter , Form, FormGroup, Label, Input, FormText} from 'reactstrap';
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import {connect} from 'react-redux'
import {getMyPartners,getPartnerTasks,getThePartner} from '../actions/ConsultancyAgencyActions'
import PropTypes from 'prop-types'
import CASidenav from './CASidenav';
import CAVisitingPartner from '../pages/CAVisitingPartner';

class CAPartners extends Component{
    
    state = {
        modal: false,
          } 

 onPartnerClick =(_id) =>{
   //  this.toggle();
   let path = `/ConsultancyAgency/Partner/`+_id;
   this.props.history.push({
       pathname:path,
       data:_id
    })}
 toggle=()=> {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }
render(){
this.props.getMyPartners();
const {mypartners}=this.props.ca
const {partnertasks}=this.props.ca
    return(
    
    <div>
        
        <Container>
        <h1> My Partners </h1>
        <br/>
        <ListGroup >
            <TransitionGroup className="mypartner-list">
            {mypartners.map( item => (
               <CSSTransition key={item._id} timeout={500} >
               <ListGroupItem >
                <Button block outline color= "warning" onClick={this.onPartnerClick.bind(this,item._id)}> {item.name} </Button>
                   
                </ListGroupItem>
                </CSSTransition>
          ))}
  
            </TransitionGroup>
        </ListGroup>
        <br/>
        <Modal isOpen= {this.state.modal} toggle={this.toggle}>
       <ModalHeader toggle={this.toggle}>
       Partner Tasks
       </ModalHeader>
           <ModalBody>
               <ListGroup>
                {partnertasks.map( task => (
                    <CSSTransition key={task._id} timeout={500} >
                    <ListGroupItem >
                    <Button block >{task.name} </Button>
                        
                    </ListGroupItem>
                </CSSTransition>  ))}   
                 </ListGroup>    
             </ModalBody>
       </Modal>
       </Container>
    </div>
 

    );
}

}

CAPartners.propTypes={
    getMyPartners: PropTypes.func.isRequired,
    capartners:PropTypes.object.isRequired , //The state mapped to a prop
    getPartnerTasks:PropTypes.func.isRequired
   }

const mapStateToProps = (state) =>
({
    ca: state.ca
});

export default withRouter(connect(mapStateToProps, {getMyPartners,getPartnerTasks,getThePartner})(CAPartners))