import React, { Component, Label } from "react";
import profile from "../logo.svg";
import Image from "react-image-resizer";
import {
  faPhone,
  faAt,
  faMapMarkerAlt,
  faCheck,
  faGlobe
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

class CAHome extends Component {
    constructor(props) {
        super(props);
    this.state = {
      view: "Info",
      me:{}
    }

}
  handleButtonClick(evt) {
    console.log("clicked");
    if (evt.target.value === "Info") this.setState({ view: "Info" });
    if (evt.target.value === "Posts") this.setState({ view: "Posts" });
    if (evt.target.value === "BoardMembers") this.setState({ view: "BoardMembers" });
  }

  getMyInfo=(_id) =>{
      try{
    axios.get('/api/ConsultancyAgency/'+_id)
    .then(res => {
        this.setState({me:res.data})
    }
 
        )
}
catch{
    console.log("fi moshkela")
}
  }
  render() {
    
    this.getMyInfo("5c9113101c9d440000a926cc") //Temporary, Will Pass Token Later.
    const view = this.state.view;
    let output;

    if (view === "Info") {
      output = (
        <div>
          <ul>
            <div>
              <h5>About the Agency: </h5>
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
                      </Badge>
                    </h2>
                    </Row>
                    <Row>
                      <p className="text-muted">Type: {this.state.me.type}</p>
                    </Row>
                    <Row>
                      <FontAwesomeIcon icon={faPhone} />
                      <p> Phone: {this.state.me.phoneNumber}</p>
                    </Row>
                    <Row>
                      <FontAwesomeIcon icon={faAt} />
                      <p> Email: {this.state.me.email}</p>
                    </Row>
                    <Row>
                      <FontAwesomeIcon icon={faMapMarkerAlt} />
                      <p> Address: {this.state.me.address}</p>
                    </Row>
                    <Row>
                      <FontAwesomeIcon icon={faGlobe} />
                      <p> Website: {this.state.me.website}</p>
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
