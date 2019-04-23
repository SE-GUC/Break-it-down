import React, { Component } from "react";
import profile from "../profilePictureMale.png";
import Image from "react-image-resizer";
import Post from "../components/Post";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { ListGroup, ListGroupItem } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import CASidenav from "../components/BasicSideNavBar";
import {
  faPhone,
  faAt,
  faMapMarkerAlt,
  faCheck,
  faGlobe,
  faTools,
  faAward,
  faRocket,
  faTasks,
  faCalendarAlt
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Jumbotron,
  Button,
  Badge,
  Card,
  Row,
  Container,
  ButtonGroup
} from "react-bootstrap";
import { link } from "fs";
import axios from "axios";

class CAVisitingPartner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "Info",
      data: [],
      posts: []
    };
  }

  componentWillMount() {
    const { data } = this.props.location;
    console.log(data);
    this.getPosts(data);
    this.getMemberProfile(data);
    console.log(this.state.data);
  }

  async getMemberProfile(id) {
    await axios
      .get(`/api/partner/viewProfile/` + id)
      .then(res => {
        this.setState({ data: res.data });
      })
      .catch(error => {
        console.log("member not authorized");
      });
  }

  async getPosts(id) {
    await fetch(`/api/posts/getPost/` + id)
      .then(res => res.json())
      .then(posts => this.setState({ posts }))
      .catch(error => {
        alert("Your session has expired. Please login again");
        window.location = "/";
        return error;
      });
  }

  async goToChat(e) {
    console.log("chat");
    await fetch(`/api/partner/chat`).then(
      window.location.assign("http://localhost:4000/api/partner/chat")
    );
  }

  handleButtonClick(evt) {
    console.log("clicked");
    if (evt.target.value === "Info") this.setState({ view: "Info" });
    if (evt.target.value === "Posts") this.setState({ view: "Posts" });
    if (evt.target.value === "Tasks") this.setState({ view: "Tasks" });
  }
  render() {
    const view = this.state.view;
    let data = this.state.data || [];
    console.log(data);
    let output;
    let badge = this.state.data.activation ? (
      <Badge variant="primary">
        {" "}
        <FontAwesomeIcon icon={faCheck} />
      </Badge>
    ) : (
      <div />
    );

    if (view === "Info")
      output = (
        <div>
          <p>{data.description}</p>

          <p>{data.certificates}</p>
        </div>
      );
    if (view === "Posts") {
      const posts = this.state.posts;
      console.log(posts);
      output = posts.data.map(post => (
        <Post key={post._id} value={post} edit={false} />
      ));
    }
    if (view === "Tasks")
      output = (
        <div>
          <h1>Tasks</h1>

          <ListGroup>
            {data.tasks.map(task => (
              <CSSTransition key={task._id} timeout={500}>
                <ListGroupItem>
                  <Button block>{task.name} </Button>
                </ListGroupItem>
              </CSSTransition>
            ))}
          </ListGroup>
        </div>
      );
    console.log(data.tasks);
    return (
      <div>
        {/* <PartnerNavbar /> */}
        <CASidenav />

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
                    <Button
                      variant="outline-warning"
                      onClick={e => this.goToChat(e)}
                    >
                      Send Message
                    </Button>
                  </ul>

                  <ul>
                    <h3>
                      {data.name}
                      {badge}
                    </h3>
                    <Row>
                      <p className="text-muted">partner</p>
                    </Row>
                    <Row>
                      <FontAwesomeIcon icon={faPhone} />
                      <p> Phone:{data.phoneNumber}</p>
                    </Row>
                    <Row>
                      <FontAwesomeIcon icon={faAt} />
                      <p> Email:{data.email}</p>
                    </Row>
                    <Row>
                      <FontAwesomeIcon icon={faMapMarkerAlt} />
                      <p> Address:{data.address}</p>
                    </Row>
                    <Row>
                      <FontAwesomeIcon icon={faGlobe} />

                      <p> Website:{data.website}</p>
                    </Row>
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
                  value="Tasks"
                  onClick={e => this.handleButtonClick(e)}
                >
                  Tasks
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

export default withRouter(CAVisitingPartner);
