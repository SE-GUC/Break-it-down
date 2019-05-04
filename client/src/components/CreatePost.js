import React, { Component } from "react";
import profile from "../profilePictureMale.png";
import { Card, Image } from "semantic-ui-react";
import { Button, Col, Form } from "react-bootstrap";
import axios from "axios";
import validator from "../validations/validation";

class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "Info",
      data: [],
      content: "",
      title: ""
    };
  }
  updateTitle(evt) {
    this.setState({
      title: evt.target.value
    });
  }
  updateContent(evt) {
    this.setState({
      content: evt.target.value
    });
  }
  async handleCreation(event) {
    console.log("handled");

    const info = {
      title: this.state.title,
      content: this.state.content
    };
    const isValidated = validator.createPostValidation(info);
    if (isValidated.error) alert(isValidated.error.details[0].message);
    else
      await axios
        .post("/api/posts/createPost", info)
        .then(function(response) {
          console.log("post created successfully");
          alert("Post created successfully");
        })
        .catch(function(error) {
          alert("An error occured so post was not created");
          console.log(error);
        });
  }
  componentWillMount() {
    this.getMemberProfile();
  }
  async getMemberProfile() {
    await fetch(`/api/member/viewMember`)
      .then(res => res.json())
      .then(data => this.setState({ data }))
      .catch(error => {
        alert("Your session has expired. Please login again");
        window.location = "/";
        return error;
      });
  }
  render() {
    let data = this.state.data || [];
    return (
      <div class="ui fluid container">
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
    `}
        </style>
        <Card fluid>
          <Card.Content>
            <Card.Header>
              <Image src={profile} avatar />
              {data.name}
            </Card.Header>
            <Card.Meta> </Card.Meta>
            <Card.Description>
              <Form.Group controlId="formTitle">
                <Form.Label>Post Title</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="1"
                  onChange={evt => this.updateTitle(evt)}
                />
              </Form.Group>
              <Form.Group controlId="formContent">
                <Form.Label>Post Content</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="3"
                  onChange={evt => this.updateContent(evt)}
                />
              </Form.Group>
            </Card.Description>
            <Button
              variant="flat"
              type="button"
              onClick={event => this.handleCreation(event)}
            >
              Create Post
            </Button>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

export default CreatePost;
