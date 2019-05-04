import React, { Component } from "react";
import profile from "../logo.svg";
import Image from "react-image-resizer";
import CreatePost from "../components/CreatePost";
import Post from "../components/Post";
import {
  faPhone,
  faAt,
  faMapMarkerAlt,
  faCheck,
  faGlobe,
  faPencilAlt
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CASidenav  from "../components/BasicSideNavBar";
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
import {ListGroup, Modal, ModalHeader,ModalBody , ModalFooter , Label,Form, FormGroup, Input, FormText} from 'reactstrap';


class CAHome extends Component {
    constructor(props) {
        super(props);
    this.state = {
      view: "Info",
      me:{},
      modal: false,
      modal2: false,
      uname:null,
      uemail:null,
      uaddress:null,
      uwebsite:null,
      uphoneNumber:null,
      udescription:null,
      posts: []
     
    }
    this.onChange = this.onChange.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggle2 = this.toggle2.bind(this);

}

  handleButtonClick(evt) {
    console.log("clicked");
    if (evt.target.value === "Info") this.setState({ view: "Info" });
    if (evt.target.value === "Posts") this.setState({ view: "Posts" });
    if (evt.target.value === "BoardMembers") this.setState({ view: "BoardMembers" });
  }

  componentDidMount() {
    this.getMyInfo();
    this.getPosts();
  }

  getMyInfo=() =>{
      try{
    axios.get('/api/ConsultancyAgency/')
    .then(res => {
        this.setState({me:res.data})
    }
 
        ).catch(error => {
          alert("Your session has expired. Please login again");
          window.location = "/";
          return error;
        });
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
  toggle2() {
    this.setState(prevState => ({
      modal2: !prevState.modal2
    }));
  }


  onChange= e => {
    this.setState({
      [e.target.name]:e.target.value}
      );
    };
   

  
  

  onSubmit= e=> {
   
    const updatedCa=
    {name: this.state.uname,
      email: this.state.uemail,
      description: this.state.udescription,
      address: this.state.uaddress,
      website: this.state.uwebsite,
      phoneNumber: this.state.uphoneNumber

    }
    axios.put('/api/ConsultancyAgency/',updatedCa)

 
    this.state.uname=null
    this.state.uemail=null
    this.state.udescription=null
    this.state.uaddress=null
    this.state.uwebsite=null
    this.state.uphoneNumber=null


    this.toggle2(); 
    this.toggle();
    
  }

  async goToChat(e) {
    console.log("chat");
    await fetch(`/api/partner/chat`).then(
      window.location.assign("/api/partner/chat")
    );
  }
  async getPosts() {
    await fetch(`/api/posts/getPost`)
      .then(res => res.json())
      .then(posts => this.setState({ posts }))
      .catch(error => {
        alert("Your session has expired. Please login again");
        window.location = "/";
        return error;
      });
  }


  render() {


    console.log(this.state.me.data)
    let createPost;
    //this.getMyInfo() //Temporary, Will Pass Token Later.
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

    if (view === "Posts") {
      const posts = this.state.posts;
      console.log(posts);
      createPost = <CreatePost />;
      output = posts.data.map(post => (
        <Post key={post._id} value={post} edit={true} />
      ));
    }
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
        <CASidenav></CASidenav>


        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
        <ModalHeader toggle={this.toggle}>Edit Profile</ModalHeader>
        <ModalBody>
        <Label for="caname">Name</Label>
        <Input type="text" name="uname" id="caname" placeholder="" defaultValue={this.state.me.name} onChange={this.onChange}/>
       
        <Label for="cadescription">Description</Label>
        <Input type="textarea" name="udescription" id="cadesc" defaultValue={this.state.me.description}  onChange={this.onChange}/>
    
        <Label for="address">Address</Label>
        <Input type="text" name="uaddress" id="caaddress" defaultValue= {this.state.me.address} onChange={this.onChange}/>

        <Label for="caemail">Email</Label>
        <Input type="email" name="uemail" id="caemail" defaultValue= {this.state.me.email} onChange={this.onChange}/>
 
        <Label for="cawebsite">Website</Label>
        <Input type="text" name="uwebsite" id="cawebsite" defaultValue= {this.state.me.website} onChange={this.onChange}/>

        <Label for="caphone">Phone Number</Label>
        <Input type="text" name="uphoneNumber" id="caphone" defaultValue= {this.state.me.phoneNumber}  onChange={this.onChange}/>
   
        <ModalFooter>
          <Button color="primary" onClick={this.onSubmit}>Submit</Button>{' '}
          <Button color="secondary" onClick={this.toggle}>Cancel</Button>
         
                  </ModalFooter>

        </ModalBody>
     
        </Modal>

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
                  Posts
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
            {createPost}
              <Card.Body>{output}</Card.Body>
            </Card>
          </Container>
        </Jumbotron>

        <Modal isOpen={this.state.modal2} toggle={this.toggle2} className={this.props.className} centered>
          <ModalBody>
           The edit request was sent to an admin, waiting their approval :)
            </ModalBody>
        </Modal>

      </div>
    );
  }
}

export default CAHome;
