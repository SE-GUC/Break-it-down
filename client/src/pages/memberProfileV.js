import React, { Component } from "react";
import profile from "../profilePictureMale.png";
import Image from "react-image-resizer";
import Post from "../components/Post";
import Side from "../components/BasicSideNavBar";
import {
  faPhone,
  faAt,
  faMapMarkerAlt,
  faCheck,
  faBirthdayCake,
  faTools,
  faAward,
  faRocket
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

class ProfileMember extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "Info",
      data: [],
      posts: []
    };
  }

  componentWillMount() {
    this.getMemberProfile();
    this.getPosts();
  }

  async getMemberProfile() {
    const mID = this.props.match.params.mID;
    console.log("mID: " + mID);
    await fetch(`/api/member/viewMember/${mID}`)
      .then(res => res.json())
      .then(data => this.setState({ data }));

    console.log(this.state.data);
  }

  async getPosts() {
    const mID = this.props.match.params.mID;
    await fetch(`/api/posts/getPost/` + mID)
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
    //console.log(window.localStorage.getItem("access_token"));
    const view = this.state.view;
    let data = this.state.data || [];
    console.log(data.skills);
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
          <ul>
            <div>
              <h4>
                <FontAwesomeIcon icon={faTools} /> Skills
                <FontAwesomeIcon icon={faTools} />
              </h4>
              <p>{data.skills}</p>
              <hr />
            </div>
            <div>
              <h4>
                <FontAwesomeIcon icon={faRocket} />
                Interests
                <FontAwesomeIcon icon={faRocket} />
              </h4>
              <hr />
              <p>{data.interests}</p>
            </div>
            <div>
              <h4>
                <FontAwesomeIcon icon={faAward} />
                Certificates
                <FontAwesomeIcon icon={faAward} />
              </h4>
              <hr />
              <p>{data.certificates}</p>
            </div>
          </ul>{" "}
        </div>
      );
    if (view === "Posts") {
      const posts = this.state.posts;
      console.log(posts);
      output = posts.data.map(post => (
        <Post key={post._id} value={post} edit={false} />
      ));
    }
    if (view === "Tasks") output = <h1>Tasks</h1>;

    return (
      <div>
        <Side />
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
                      <p className="text-muted">Member</p>
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
                      <FontAwesomeIcon icon={faBirthdayCake} />
                      <p> Birthday:{data.birthday}</p>
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

export default ProfileMember;
