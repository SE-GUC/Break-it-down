import React, { Component } from "react";
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
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Post Title",
      content: "hello my name is yasmin",
      likes: 0
    };
  }

  render() {
    return (
      <div>
        <Card>
          <Card.Header as="h5">{this.state.title}</Card.Header>
          <Card.Body>
            <Card.Text>{this.state.content}</Card.Text>

            <Button variant="primary">
              {" "}
              <FontAwesomeIcon icon={faThumbsUp} />
              Like<Badge variant="light">{this.state.likes}</Badge>
            </Button>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default Post;
