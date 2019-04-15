import React, {Component} from 'react';
import '../App.css';
import {Container, ListGroup, ListGroupItem, Button, Modal, ModalHeader, ModalBody, ModalFooter , Form, FormGroup, Label, Input, FormText} from 'reactstrap';
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import {connect} from 'react-redux'
import {getEvents} from '../actions/EventActions'
import PropTypes from 'prop-types'
import uuid from 'uuid'
import AddEvent from './AddEventModal';


class EventList extends Component{
    
    componentDidMount(){
     this.props.getEvents();
 }
render(){
    const {events}= this.props.event;
    console.log(events)
    return(
     <div className='events'>
    <Container  >
        <h1> Events </h1>
        <br/>
        <ListGroup >
            <TransitionGroup className="event-list">
           {events.map(({_id,name,date}) => (
               <CSSTransition key={_id} timeout={500} >
                <ListGroupItem >
                    {name} {date}
                </ListGroupItem>
                </CSSTransition>
            ))}
            </TransitionGroup>
        </ListGroup>
        <br/>
        <AddEvent></AddEvent>
       
        <div>
       
      </div>
    </Container>
    </div>   

    );
}

}

EventList.propTypes={
 getEvents: PropTypes.func.isRequired,
 event:PropTypes.object.isRequired   //The state mapped to a prop
}
const mapStateToProps = (state) =>
({
    event: state.event
});

export default connect(mapStateToProps, {getEvents})(EventList)