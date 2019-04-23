import React, {Component} from 'react';
import '../App.css';
import {Container, ListGroup, ListGroupItem, Button, Modal, ModalHeader, ModalBody, ModalFooter , Form, FormGroup, Label, Input, FormText} from 'reactstrap';
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import AddEvent from './AddEventModal';
import axios from 'axios';
import CASidenav from './BasicSideNavBar';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt,faPencilAlt } from '@fortawesome/free-solid-svg-icons';

class CAMyEvents extends Component{
    constructor(props){
        super(props)    
        this.state={
            events:[],
            uname:null,
            udescription:null,
            udate:null,
            utime:null,
            u_id:null,
            ulocation:null,
            modal:false
        }
        this.toggle = this.toggle.bind(this);

   
    }
  


 getEvents= () =>{
    axios.get("/api/Events/Mine")
    .then(res=> this.setState({events:res.data}))
    .catch(error => {
        alert("Your session has expired. Please login again");
        window.location = "/";
        return error;
      });

 }
   
 toggle(_id,name,description,location,date,time) {
    this.setState(prevState => ({
      modal: !prevState.modal,
  
    }));
  }


 
 DeleteEvent= (_id) =>{
    axios.delete("/api/Events/"+_id)
    this.getEvents()


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
           {events.map(({_id,name,date,description,time,location}) => (
               <CSSTransition key={_id} timeout={500} >
                <ListGroupItem >

                    {name} {date}  {"      "}<div> 
                       <FontAwesomeIcon
                        icon={faTrashAlt}
                        variant="outline-info"
                        onClick={this.DeleteEvent.bind(this,_id)}
                       /></div>
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