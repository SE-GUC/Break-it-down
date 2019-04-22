import React, { Component } from "react";
import profile from "../profilePictureMale.png";
import { Card, Image, Button, Dimmer, Loader, Modal } from "semantic-ui-react";
import { Form } from "react-bootstrap";
import axios from "axios";
import validator from "../validations/validation";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: this.props.value,
      edit: this.props.edit,
      editView: false,
      content: this.props.value.content,
      title: this.props.value.title
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
  async handleUpdatePost(event) {
    console.log("handled");

    const info = {
      title: this.state.title,
      content: this.state.content
    };
    console.log("yasmiiiiiin");
    const isValidated = validator.createPostValidation(info);
    if (isValidated.error) alert(isValidated.error.details[0].message);
    else
      await axios
        .put("/api/posts/editPost/" + this.state.post._id, info)
        .then(function(response) {
          console.log("post created successfully");
          alert("Post updated successfully");
        })
        .catch(function(error) {
          alert("An error occured so post was not created");
          console.log(error);
        });
  }

  render() {
    let edit = this.state.edit;
    let editButton;
    if (edit == true)
      editButton = (
        <Modal
          trigger={<Button class="ui secondary button">Edit</Button>}
          basic
          size="small"
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)"
          }}
        >
          <Modal.Content>
            <Card fluid>
              <Card.Content>
                <Card.Header>
                  <Image src={profile} avatar />
                  {this.state.post.name}
                </Card.Header>
                <Card.Meta> </Card.Meta>
                <Card.Description>
                  <Form.Group controlId="formTitle">
                    <Form.Label>Post Title</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows="1"
                      onChange={evt => this.updateTitle(evt)}
                      placeholder={this.state.post.title}
                    />
                  </Form.Group>
                  <Form.Group controlId="formContent">
                    <Form.Label>Post Content</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows="3"
                      onChange={evt => this.updateContent(evt)}
                      placeholder={this.state.post.content}
                    />
                  </Form.Group>
                </Card.Description>
                <Button
                  variant="flat"
                  type="button"
                  onClick={event => this.handleUpdatePost(event)}
                >
                  Update Post
                </Button>
              </Card.Content>
            </Card>
          </Modal.Content>
        </Modal>
      );
    else editButton = <div />;
    return (
      <div class="ui fluid container">
        <Card fluid>
          <Card.Content>
            <Card.Header>
              {" "}
              <Image src={profile} avatar />
              {this.state.post.name}
            </Card.Header>
            <Card.Meta>{this.state.post.title}</Card.Meta>
            <Card.Description>{this.state.post.content}</Card.Description>
            {editButton}
          </Card.Content>
        </Card>
      </div>
    );
  }
}

export default Post;
