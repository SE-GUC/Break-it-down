import React, {Component} from 'react';
import '../App.css';
import {Container, ListGroup, ListGroupItem, Button, Modal, ModalHeader, ModalBody, ModalFooter , Form, FormGroup, Label, Input, FormText} from 'reactstrap';
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import {connect} from 'react-redux'
import {getMyPartners,getPartnerTasks} from '../actions/ConsultancyAgencyActions'
import PropTypes from 'prop-types'
import CASidenav from './CASidenav';

class CAPartners extends Component{
    
    state = {
        modal: false,
          } 
    componentDidMount(){
 }
 onPartnerClick =(_id) =>{
     this.toggle();
    this.props.getPartnerTasks(_id);
 }
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
    
    <Container  >
        <CASidenav></CASidenav>
        <h1> My Partners </h1>
        <br/>
        <ListGroup >
            <TransitionGroup className="mypartner-list">
            {mypartners.map( item => (
               <CSSTransition key={item._id} timeout={500} >
               <ListGroupItem >
                <Button block  color= 'warning' onClick={this.onPartnerClick.bind(this,item._id)}>{item.name} </Button>
                   
                </ListGroupItem>
                </CSSTransition>
          ))}
          {/*{ {mypartners.map(({_id,name,email}) => (
               <CSSTransition key={_id} timeout={500} >
                <ListGroupItem >
                    {name} {email}
                </ListGroupItem>
                </CSSTransition>
          ))}} THIS IS THE CORRECT ONE THIS IS UNTIL THE DATABASE IS FIXED*/}
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

export default connect(mapStateToProps, {getMyPartners,getPartnerTasks})(CAPartners)