import React, {Component} from 'react';
import '../App.css';
import {Container, ListGroup, ListGroupItem, Button, Modal, ModalHeader, ModalBody, ModalFooter , Form, FormGroup, Label, Input, FormText} from 'reactstrap';
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import AddEvent from './AddEventModal';
import axios from 'axios';
import CASidenav from './CASidenav';


class CAMyEvents extends Component{
    constructor(props){
        super(props)    
        this.state={
            events:[]
        }
    }
  


 getEvents= () =>{
    axios.get("/api/Events/Mine")
    .then(res=> this.setState({events:res.data}))


 }


render(){
    this.getEvents();

    const {events}= this.state;
    return(
     <div className='events'>
     <CASidenav></CASidenav>
    <Container  >
        <h1> My Events </h1>
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

export default CAMyEvents