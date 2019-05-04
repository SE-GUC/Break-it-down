import React, {Component} from 'react';
import '../App.css';
import {Container, ListGroup, ListGroupItem, Button, Modal, ModalHeader, ModalBody, ModalFooter , Form, FormGroup, Label, Input, FormText} from 'reactstrap';
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import {connect} from 'react-redux'
import {addEvent} from '../actions/EventActions'
import PropTypes from 'prop-types'
import uuid from 'uuid'
import { withRouter } from 'react-router-dom';

import axios from 'axios'

class AddEventModal extends Component{
constructor(props) {
    super(props);
    this.state = {
      modal: false,
      modal2:false,
      eventname:null,
      eventdesc:null,
      location:"6th of October",
      eventdate:null,
      eventtime:null    };

    this.onChange = this.onChange.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggle2 = this.toggle2.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }
  toggle2() {
    this.setState(prevState => ({
      modal2: !prevState.modal2
    }));
  }

  onChange= e => {

    this.setState({
      [e.target.name]:e.target.value}
      );
  }

  onSubmit= e=> {
    //e.preventDefault();
    if(this.state.eventname==null||this.state.eventdesc==null||this.state.eventdate==null||this.state.location==null){
      this.toggle2();
      return;
    }
    const newEvent={name: this.state.eventname,
      date: this.state.eventdate,
      description: this.state.eventdesc,
      location: this.state.location,
      time: this.state.eventtime
    }

    axios.post('/api/Events',newEvent)
    .then(res => {

     this.toggle();
     let path = `/user/suggestions`;
      this.props.history.push({
        pathname:path,
        data:res.data
      
     })
    
     console.log(res.data)
    })
    //this.props.addEvent(newEvent);

    
  

  }
render(){
    return(
            <Container>
        <Button color='warning' onClick={this.toggle} >Create New Event</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
        <ModalHeader toggle={this.toggle}>Create New Event</ModalHeader>
        <ModalBody>
        <Label for="eventname">Event Name</Label>
        <Input type="text" name="eventname" id="eventname" placeholder="" onChange={this.onChange}/>
       
        <Label for="eventdescription">Description</Label>
        <Input type="textarea" name="eventdesc" id="eventdesc" placeholder="" onChange={this.onChange}/>
    
        <Label for="location">Select Location</Label>
        <Input type="select" name="location" id="eventlocation" placeholder= "Location" onChange={this.onChange}>
          <option>6th of October</option>
          <option>Dokki</option>
          <option>Mohandseen</option>
          <option>Haram</option>
          <option>Faisal</option>
          <option>Nasr City</option>
          <option>Heliopolis</option>
          <option>New Cairo</option>
          <option>Rehab City</option>
          <option>Madinty</option>
          <option>Helwan</option>
          <option>Sherouk</option>

        </Input>
       
        <Label for="eventdate">Date</Label>
        <Input type="date" name="eventdate" id="eventdate" placeholder="" onChange={this.onChange}/>
 
        <Label for="eventtime">Time</Label>
        <Input type="time" name="eventtime" id="eventtime" placeholder="" onChange={this.onChange}/>
          
   
        <ModalFooter>
          <Button color="primary" onClick={this.onSubmit}>Submit</Button>{' '}
          <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          <Modal isOpen={this.state.modal2} toggle={this.toggle2} className={this.props.className}>
          <ModalHeader toggle={this.toggle2}>Error</ModalHeader>
          <ModalBody>
            Please fill in all the info

            </ModalBody>
            </Modal>
                  </ModalFooter>

        </ModalBody>
     
        </Modal>
                    </Container>
    )
}


   
}
const mapStateToProps = state => ({

  event: state.event

})
export default withRouter(connect(mapStateToProps, {addEvent})(AddEventModal))
