import React, {Component} from 'react';
import '../App.css';
import {Container,Dropdown,DropdownToggle,DropdownMenu,DropdownItem, ListGroup, ListGroupItem, Button, Modal, ModalHeader, ModalBody, ModalFooter , Form, FormGroup, Label, Input, FormText} from 'reactstrap';
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import {connect} from 'react-redux'
import {filterTasks, getMembers, contactAdmin} from '../actions/ConsultancyAgencyActions'
import PropTypes from 'prop-types'

import uuid from 'uuid'
import CAPartners from './CAPartners';
import CASidenav from './BasicSideNavBar';


class consultancyAgencyStories extends Component{
   state = {
        modal: false,
        modal2: false,
        caname:null,
        caemail:null,
        camessage:null,
        //dropdownOpen:false
    }

    componentDidCatch(error, info) {
      // Display fallback UI
     // this.setState({ hasError: true });
      // You can also log the error to an error reporting service
     // logErrorToMyService(error, info);
    }
  
toggle =() => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  onChange= e => {

    this.setState({
      [e.target.name]:e.target.value}
      );
  }

  infoNotInserted= () => {
    this.setState(prevState => ({
        modal2: !prevState.modal2
      }));

  }


  
  onSubmit= ()=> {
    if(this.state.caemail==null||this.state.caname==null||this.state.camessage==null){
      this.infoNotInserted();
      return;
    }
    const newMessage={
      name: this.state.caname,
      email: this.state.caemail,
      message: this.state.camessage
    }
    console.log(newMessage)
    this.props.contactAdmin(newMessage)
    this.state.caname=null
    this.state.caemail=null
    this.state.camessage=null
    this.toggle();
  

  }

   /* componentDidMount(){
    this.props.getMembers();
 }*/
render(){
    /*const {members}= this.props.ca;

    console.log(members)*/

    return(
   
 
    <div>
   <CASidenav></CASidenav>
    <CAPartners/>

<Container>
        <Button color='warning' onClick={this.toggle} >Contact an Admin</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
        <ModalHeader toggle={this.toggle}>
        Please fill in your information and an admin will contact you by email :)</ModalHeader>
        <ModalBody>
        <Label for="caname">Name</Label>
        <Input type="text" name="caname" id="caname" placeholder="" onChange={this.onChange}/>
       
        <Label for="caemail">Email</Label>
        <Input type="email" name="caemail" id="caemail" placeholder="" onChange={this.onChange}/>
       
        <Label for="camessage">Message</Label>
        <Input type="textarea" name="camessage" id="camessage" placeholder="" onChange={this.onChange}/>
        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={this.onSubmit}>Submit</Button>{' '}
          <Button color="secondary" onClick={this.toggle}>Cancel</Button>
       
         </ModalFooter>

     
        </Modal>
          </Container>
        <Modal  isOpen={this.state.modal2} toggle={this.infoNotInserted} className={this.props.className} centered={true}>
        <ModalHeader toggle={this.infoNotInserted}>
        Please fill in ALL your information to proceed</ModalHeader>
    
          <Button color="primary" onClick={this.infoNotInserted}>OK</Button>{' '}
    

     
        </Modal>


 </div>

    );
    }}

consultancyAgencyStories.propTypes={
 filterTasks: PropTypes.func.isRequired,
 getMembers: PropTypes.func.isRequired,

 contactAdmin: PropTypes.func.isRequired,

    members:PropTypes.array.isRequired   //The state mapped to a prop
}
const mapStateToProps = (state) =>
({
    ca: state.ca
});

{/* <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
          Dropdown
        </DropdownToggle>
        <DropdownMenu>
        {members.map(({_id,name}) => (
               <CSSTransition key={_id} timeout={500} >
                <DropdownItem>  {name}</DropdownItem>   
                </CSSTransition>
            ))}
        </DropdownMenu>
      </Dropdown> */}

export default connect(mapStateToProps, {filterTasks,getMembers,contactAdmin})(consultancyAgencyStories)