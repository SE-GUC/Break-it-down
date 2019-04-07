import React, {Component} from 'react';
import '../App.css';
import {Container, ListGroup, ListGroupItem, Button} from 'reactstrap'
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import {connect} from 'react-redux'
import {getEvents} from '../actions/EventActions'
import PropTypes from 'prop-types'
import uuid from 'uuid'

class EventList extends Component{

 componentDidMount(){
     this.props.getEvents();
 }
render(){
    const {events}= this.props.event;
    return(
     <div className='events'>
    <Container>
        <p> Events </p>
        <ListGroup>
            <TransitionGroup className="event-list">
           {events.map(({_id,name,date}) => (
               <CSSTransition key={_id} timeout={500} >
                <ListGroupItem className="event-item">
                    {name} {date}
                </ListGroupItem>
                </CSSTransition>
            ))}
            </TransitionGroup>
        </ListGroup>
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