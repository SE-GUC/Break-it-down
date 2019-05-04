import React, { Component } from "react";

import { Link, BrowserRouter as Route } from "react-router-dom";
import NavbarPage from "../components/Navbar";

import profile from "../../src/profilepic.jpg";
import Image from "react-image-resizer";
import Post from "../components/Post";
import Fa from "../components/cospaceFacilitiesV";
import Desc from "../components/CospaceDescV";
import Rooms from "../pages/cospcaeAllRoomsV";
import Basics from "../components/CospaceBasicInfoV";
import Side from "../components/BasicSideNavBar";

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
class List extends Component {
  // Initialize the state
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      view: "Info",
      type: "member",
      info: {},
      facilities: [],
      namee: "",
      flag: false,
      coID: this.props.match.params.id,
      posts: []
    };
    this.getList = this.getList.bind(this);
  }

  // Fetch the list on first mount
  componentDidMount() {
    this.getList();
    this.getPosts();
  }

  handleButtonClick(evt) {
    console.log("clicked");
    if (evt.target.value === "Info") this.setState({ view: "Info" });
    if (evt.target.value === "Posts") this.setState({ view: "Posts" });
    if (evt.target.value === "Rooms") this.setState({ view: "Rooms" });
  }

  // Retrieves the list of items from the Express app
  getList = async () => {
    const id = this.props.match.params.id;
    console.log("ll " + id);
    await fetch(`/api/member/PartnerCoworkingspaces/${id}/`)
      .then(res => res.json())
      .then(info => this.setState({ info: info.pop() }))
      // .then(info => this.setState({ info }))
      .then(coID => this.setState({ coID }));
    this.setState({
      facilities: this.state.info.facilities
    });
    // console.log(this.state.info.pop().name)
    //  console.log(this.state.list)
  };
  async getPosts() {
    const id = this.props.match.params.id;
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

  // render() {
  //   let sidenav;

  //   if (this.state.type === "member") {
  //     sidenav = <MemberSidenav />;
  //   } else {
  //     sidenav = <MemberSidenav />;
  //   }
  //   const { list } = this.state;
  //   return (
  //     <div className="App">
  //       <Route>
  //         {" "}
  //         <div>
  //           {" "}
  //           <NavbarPage whichPage="coworkingspace" /> <MemberSidenav />;
  //         </div>{" "}
  //       </Route>
  //       <h1>{list.name}</h1>
  //       <div>
  //         {/* Render the list of items */}
  //         {list.map(el => {
  //           return (
  //             <div key={el.userID}>
  //               {"id: "}
  //               <span>{el.userID}</span>
  //               <br />
  //               {"Name: "}
  //               <span>{el.name}</span>
  //               <br />
  //               {"facilities: "}
  //               <span>{el.facilities}</span>
  //               <br />
  //               {el.rooms.map(room => {
  //                 return (
  //                   <div key={room.id}>
  //                     <Link
  //                       to={{
  //                         pathname: `/specificRoom/${el._id}/${room._id}`,
  //                         state: { name: el.name }
  //                       }}
  //                     >
  //                       <button className="btn btn-primary btn-sm m-2">
  //                         {el.id}
  //                       </button>
  //                     </Link>
  //                     {"Capacity: "}
  //                     <span>{room.capacity}</span>
  //                   </div>
  //                 );
  //               })}
  //             </div>
  //           );
  //         })}
  //       </div>
  //     </div>
  //   );
  // }

  render() {
    console.log(this.state.coID);
    const view = this.state.view;
    let output;
    const { info } = this.state;
    if (view === "Info")
      output = (
        <div>
          <ul>
            <div>
              <Desc coID={this.state.coID} />
              <br />
              <br />
              <Fa coID={this.state.coID} />
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
    if (view === "Rooms")
      output = (
        <div>
          <ul>
            <div>
              <Rooms coID={this.props.match.params.id} />
            </div>
          </ul>{" "}
        </div>
      );

    return (
      <div>
        <Side />
        <style type="text/css">
          {`
    .btn-flat {
      background-color: gray;
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

export default List;
