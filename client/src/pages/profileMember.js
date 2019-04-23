import React, { Component } from "react";
import profile from "../profilePictureMale.png";
import Image from "react-image-resizer";
import Post from "../components/Post";
import Basics from "../components/BasicInfoMember";
import CreatePost from "../components/CreatePost";
import { Card } from "semantic-ui-react";
import Side from "../components/BasicSideNavBar";
import { Link } from "react-router-dom";
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
  Row,
  Container,
  ButtonGroup
} from "react-bootstrap";

class ProfileMember extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "Info",
      memID: window.location.pathname.split("/").pop(),
      rating: null,
      data: [],
      posts: [],
      list: []
    };
  }

  getList = async () => {
    await fetch(`/api/member/viewMyTasks`)
      .then(res => res.json())
      .then(list => this.setState({ list }))
      .catch(error => {
        alert("Your session has expired. Please login again");
        window.location = "/";
        return error;
      });
  };

  componentWillMount() {
    this.getMemberProfile();
    this.getPosts();
    this.getList();
  }

  async goToChat(e) {
    console.log("chat");
    await fetch(`/api/partner/chat`).then(
      window.location.assign("http://localhost:4000/api/partner/chat")
    );
  }

  async getMemberProfile() {
    const memID = this.state.memID;
    console.log(memID);
    await fetch(`/api/member/viewMember/`)
      .then(res => res.json())
      .then(data => this.setState({ data }))
      .then(memID => this.setState({ memID }));
    console.log(memID);
    console.log(this.state.data);
    await fetch(`/api/member/MyRating/`)
      .then(res => res.json())
      .then(rating => this.setState({ rating }));
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

  handleButtonClick(evt) {
    console.log("clicked");
    if (evt.target.value === "Info") this.setState({ view: "Info" });
    if (evt.target.value === "Posts") this.setState({ view: "Posts" });
    if (evt.target.value === "Tasks") this.setState({ view: "Tasks" });
  }
  render() {
    //console.log(window.localStorage.getItem("access_token"));
    const view = this.state.view;
    const list = this.state.list;
    console.log(list);
    let data = this.state.data || [];
    console.log(data.skills);
    let output;
    let createPost;
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
      createPost = <CreatePost />;
      output = posts.data.map(post => (
        <Post key={post._id} value={post} edit={true} />
      ));
    }
    if (view === "Tasks")
      output = (
        <div>
          {list.map(el => (
            <div
              key={el.userID}
              class="card border-secondary mb-3"
              style={{ width: "800px", margin: "0 auto" }}
            >
              <h5 class="card-header">{"Name:" + " " + el.name}</h5>
              <br />
              <div class="list-group">
                <button
                  class="list-group-item list-group-item-action"
                  disabled={el.description}
                >
                  {" Description: " + el.description}
                </button>
                <button
                  class="list-group-item list-group-item-action"
                  disabled={el.description}
                >
                  {" field: " + el.field}
                </button>
                <Link to={`/MemberStartTask/${el.taskID}`}>
                  <button variant="primary" size="lg" color="blue" active>
                    Start this task
                  </button>
                </Link>
                <Link to={`/MemberEndTask/${el.taskID}`}>
                  <button variant="primary" size="lg" color="blue" active>
                    end this task
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      );

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
            <Card fluid>
              <Card.Content>
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
                    <Card.Header>
                      {data.name}
                      {badge}
                    </Card.Header>
                    <Row>
                      <p className="text-muted">Member</p>
                    </Row>
                    <Basics memID={this.state.memID} />
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
              </Card.Content>
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
            <Card fluid>
              {createPost}
              <Card.Content>{output}</Card.Content>
            </Card>
          </Container>
        </Jumbotron>
      </div>
    );
  }
}

export default ProfileMember;
