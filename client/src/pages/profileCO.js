import React, { Component } from "react";
import profile from "../../src/profilepic.jpg";
import Image from "react-image-resizer";
import Post from "../components/Post";
import Fa from "../components/Facilities";
import Desc from "../components/CoDescription";
import { Link } from "react-router-dom";
import Rooms from "../pages/AllRooms"
import Basics from "../components/BasicInfoCO"
import {
  faPhone,
  faAt,
  faMapMarkerAlt,
  faCheck,
  faGlobe
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  Jumbotron,
  Button,
  Badge,
  Card,
  Row,
  Container,
  Col,
  ButtonGroup
} from "react-bootstrap";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "Info",
      coID: "5caf3f533f50a4165057019f",
      info: {},
      facilities: [],
      namee: "",
      flag: false
    };
    this.getList = this.getList.bind(this);
  }
  componentDidMount() {
    this.getList();
  }



  // Retrieves the list of items from the Express app
  getList = async () => {
    
    const coID = this.state.coID;
    await fetch(
      `/api/coworkingSpace/viewCoworkingSpace/${coID}`
    )
      .then(res => res.json())
      .then(info => this.setState({ info }));
    this.setState({
      facilities: this.state.info.facilities
    });
    
  };

  handleButtonClick(evt) {
    console.log("clicked");
    if (evt.target.value === "Info") this.setState({ view: "Info" });
    if (evt.target.value === "Posts") this.setState({ view: "Posts" });
    if (evt.target.value === "Rooms") this.setState({ view: "Rooms" });
  }

  render() {
    const view = this.state.view;
    let output;
    const { info } = this.state;
    if (view === "Info")
      output = (
          
        <div>           
          <ul>
            <div>
                <Desc coID={this.state.coID} />
                <br/>
                <br />
                <Fa coID={this.state.coID}/>
            </div>
          </ul>{" "}
        </div>
      );
    if (view === "Posts") output = <Post />;
    if (view === "Rooms") output = (
        <div>       
           
          <ul>
            <div>
                <Rooms coID={this.state.coID} />
            </div>
          </ul>{" "}
        </div>
    );

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
                    <h3>
                      {info.name}{" "}
                      <Badge variant="primary">
                        {" "}
                        <FontAwesomeIcon icon={faCheck} />
                      </Badge>
                    </h3>
                    <Row>
                      <p className="text-muted">Type : {info.type}</p>
                        
                    </Row>
                    <Basics coID={this.state.coID} />
                  </ul>
                </Row>
              </Card.Body>
            </Card>
            <div className="d-flex flex-column">
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
                  value="Rooms"
                  onClick={e => this.handleButtonClick(e)}
                >
                  Rooms
                </Button>
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
      </div>
    );
  }
}

export default Profile;