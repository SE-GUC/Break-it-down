import React, { Component } from "react";
import profile from "../logo.svg";
import Image from "react-image-resizer";
import {
  faPhone,
  faAt,
  faMapMarkerAlt,
  faCheck,
  faGlobe,
  faPencilAlt
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CASidenav  from "../components/CASidenav";
import axios from 'axios'
import {
  Jumbotron,
  Button,
  Badge,
  Card,
  Row,
  Container,
  ButtonGroup,
} from "react-bootstrap";
import {ListGroup, Modal, ModalHeader, ModalBody, ModalFooter , Label,Form, FormGroup, Input, FormText} from 'reactstrap';


class CAHome extends Component {
    constructor(props) {
        super(props);
    this.state = {
      view: "Info",
      me:{},
      modal: false
    }
    this.onChange = this.onChange.bind(this);
    this.toggle = this.toggle.bind(this);

}

  handleButtonClick(evt) {
    console.log("clicked");
    if (evt.target.value === "Info") this.setState({ view: "Info" });
    if (evt.target.value === "Posts") this.setState({ view: "Posts" });
    if (evt.target.value === "BoardMembers") this.setState({ view: "BoardMembers" });
  }

  getMyInfo=() =>{
      try{
    axios.get('/api/ConsultancyAgency/')
    .then(res => {
        this.setState({me:res.data})
    }
 
        )
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


  render() {



    
    this.getMyInfo() //Temporary, Will Pass Token Later.
    const view = this.state.view;
    let output;

    

    if (view === "Info") {
      output = (
        <div>
          <ul>
            <div>
             
              <h5>About the Agency: </h5>     {" "} 
            
              <p>{this.state.me.description}</p>
             
            </div>
          </ul>{" "}
        </div>
      );}
    if (view === "BoardMembers") {
        output = (<div>
            <h2>Our Board Members</h2>  
       
         {this.state.me.boardMembers}

        </div>

    );}
    return (
      <div>
        <style type="text/css">
          {`
    .btn-flat {
      background-color: orange;
      color: white;
    }

    .btn-xxl {
      padding: 1rem 1.5rem;
      font-size: 1.5rem;
    }
    .btn-google{
      background-color: red;
      color: white;}
    center: {
    marginLeft: "auto",
    marginRight: "auto"
  }

    `}
        </style>

        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
        <ModalHeader toggle={this.toggle}>Edit Profile</ModalHeader>
        <ModalBody>
        <Label for="caname">Name</Label>
        <Input type="text" name="name" id="caname" placeholder="" value={this.state.me.name} onChange={this.onChange}/>
       
        <Label for="cadescription">Description</Label>
        <Input type="textarea" name="description" id="cadesc" value={this.state.me.description}  onChange={this.onChange}/>
    
        <Label for="address">Address</Label>
        <Input type="text" name="address" id="caaddress" value= {this.state.me.address} onChange={this.onChange}/>

        <Label for="caemail">Email</Label>
        <Input type="email" name="email" id="caemail" value= {this.state.me.email} onChange={this.onChange}/>
 
        <Label for="cawebsite">Website</Label>
        <Input type="text" name="website" id="cawebsite" value= {this.state.me.website} onChange={this.onChange}/>

        <Label for="caphone">Phone Number</Label>
        <Input type="text" name="phoneNumber" id="caphone" value= {this.state.me.phoneNumber}  onChange={this.onChange}/>
   
        <ModalFooter>
          <Button color="primary" onClick={this.onSubmit}>Submit</Button>{' '}
          <Button color="secondary" onClick={this.toggle}>Cancel</Button>
         
                  </ModalFooter>

        </ModalBody>
     
        </Modal>
    )
}

        <Jumbotron fluid>
          <Container>
            <Card>
              <Card.Body>
                <Row>
                  <ul>
                    <Image src={profile} width={240} height={240} rounded />
                    <Button variant="outline-warning">Send Message</Button>
                  </ul>

                  <ul>
                      <Row>
                    <h2 >
                     {this.state.me.name}{" "}
                      <Badge variant="primary">
                        {" "}
                        <FontAwesomeIcon icon={faCheck} />    
                      </Badge>  {"  "}
                      <FontAwesomeIcon
                        icon={faPencilAlt}
                        variant="outline-info"
                        onClick={this.toggle}/>
                    </h2>
                    </Row>
                    <Row>
                      <p className="text-muted">Type: {this.state.me.type}</p> 
                    </Row>
                    <Row>
                      <FontAwesomeIcon icon={faPhone} />
                      <p> Phone: {this.state.me.phoneNumber}</p>  {"  "}  
                    </Row>
                    <Row>
                      <FontAwesomeIcon icon={faAt} />
                      <p> Email: {this.state.me.email}</p>  {"  "}
   
                      
                    </Row>
                    <Row>
                      <FontAwesomeIcon icon={faMapMarkerAlt} />
                      <p> Address: {this.state.me.address}</p> {"  "}
     
                    </Row>
                    <Row>
                      <FontAwesomeIcon icon={faGlobe} /> 
                      <p> Website: {this.state.me.website}</p> {"  "}
            
                    </Row>
                  </ul>
                </Row>
              </Card.Body>
            </Card>
            <div className="d-flex flex-column .btn-group-justified">
              <ButtonGroup size="lg">
                <Button
                  variant="flat"
                  value="Posts"
                  onClick={e => this.handleButtonClick(e)}
                >
                  Posts(NextSprint)
                </Button>
                <Button
                  variant="flat"
                  value="BoardMembers"
                  onClick={e => this.handleButtonClick(e)}
                >
Board Members                </Button>
                
                <Button
                  variant="flat"
                  value="Info"
                  onClick={e => this.handleButtonClick(e)}
                >
                  Info
                </Button>
              </ButtonGroup>
            </div>
            <Card>
              <Card.Body>{output}</Card.Body>
            </Card>
          </Container>
        </Jumbotron>
        <CASidenav></CASidenav>
      </div>
    );
  }
}

export default CAHome;
