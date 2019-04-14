import React, {Component} from 'react';
import '../App.css';
import {Container, ListGroup, ListGroupItem, Button, Modal, ModalHeader, ModalBody, ModalFooter , Form, FormGroup, Label, Input, FormText} from 'reactstrap';
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import {connect} from 'react-redux'
import {getMyTasks} from '../actions/ConsultancyAgencyActions'
import PropTypes from 'prop-types'
import CASidenav from './CASidenav';

class CATasks extends Component{

render(){
this.props.getMyTasks();
const {mytasks}=this.props.ca
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
                <Button block outline color= "warning" >{item.name} </Button>
                   
                </ListGroupItem>
                </CSSTransition>
          ))}
            </TransitionGroup>
        </ListGroup>
        <br/>

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

export default connect(mapStateToProps, {getMyTasks})(CATasks)