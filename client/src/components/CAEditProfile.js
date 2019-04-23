import React, {Component} from 'react';
import '../App.css';
import {Container, ListGroup, ListGroupItem, Button, Modal, ModalHeader, ModalBody, ModalFooter , Form, FormGroup, Label, Input, FormText} from 'reactstrap';
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import uuid from 'uuid'
import axios from 'axios'


class CAEditProfile extends Component{
constructor(props) {
    super(props);
    this.state = {
      modal: true,
      me:{}  
    };
    this.onChange = this.onChange.bind(this);
    this.toggle = this.toggle.bind(this);
  }


  getMyInfo=() =>{
    try{
  axios.get('/api/ConsultancyAgency/')
  .then(res => { this.setState({me:res.data})})
    }
    catch{
        console.log("fi moshkela")
    }
 }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  onChange= e => {

    this.setState({
      [e.target.name]:e.target.value}
      );
  }

  onSubmit= e=> {
    if(this.state.caname==null||this.state.cadesc==null||this.state.caemail==null||this.state.address==null){
      this.toggle2();
      return;
    }
    const newca={name: this.state.caname,
      email: this.state.caemail,
      description: this.state.cadesc,
      address: this.state.address
    }
    this.props.addca(newca);
    this.state.caname=null
    this.state.caemail=null
    this.state.cadesc=null
     this.state.address=null
    this.toggle();
  

  }
render(){
    return(
        <Container>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
        <ModalHeader toggle={this.toggle}>Edit Profile</ModalHeader>
        <ModalBody>
        <Label for="caname">Name</Label>
        <Input type="text" name="caname" id="caname" placeholder="" value={this.state.name} onChange={this.onChange}/>
       
        <Label for="cadescription">Description</Label>
        <Input type="textarea" name="cadesc" id="cadesc" placeholder="" onChange={this.onChange}/>
    
        <Label for="address">Select address</Label>
        <Input type="text" name="caaddress" id="caaddress" placeholder= "address" onChange={this.onChange}/>

        <Label for="caemail">email</Label>
        <Input type="email" name="caemail" id="caemail" placeholder="" onChange={this.onChange}/>
 
        <Label for="cawebsite">website</Label>
        <Input type="text" name="cawebsite" id="cawebsite" placeholder="" onChange={this.onChange}/>

   
        <ModalFooter>
          <Button color="primary" onClick={this.onSubmit}>Submit</Button>{' '}
          <Button color="secondary" onClick={this.toggle}>Cancel</Button>
         
                  </ModalFooter>

        </ModalBody>
     
        </Modal>
                    </Container>
    )
}


   
}
const mapStateToProps = state => ({

  ca: state.ca

})
export default connect(mapStateToProps)(CAEditProfile)
