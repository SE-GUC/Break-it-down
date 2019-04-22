import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
class ChangePAss extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rID: null,
      namee: "",
      coID: window.location.pathname.split("/").pop(),
      modalIsOpen: false
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState({ namee: e.target.value });
  }
  toggleModal() {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen
    });
  }
  // Fetch the list on first mount
  componentDidMount() {
    this.auth();
  }
  auth = async () => {
    await fetch(`/api/coworkingSpace/viewCoworkingSpace/`)
      .then(res => res.json())
      .catch(error => {
        alert("Your session has expired. Please login again");
        window.location = "/";
        return error;
      });
  };
  getUser = e => {
    e.preventDefault();
    const c = this.state.namee;

    console.log("hiii");
    let databody = {
      password: c
    };
    console.log(databody);
    const coID = this.state.coID;
    console.log(coID);
    fetch(`/api/coworkingspace/updateCospace/${coID}`, {
      method: "PUT",
      body: JSON.stringify(databody),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(json => console.log(json));
  };

  render() {
    return (
        <div>
      <form>
        <input
          style={{ margin: "20px auto", display: "block" }}
          class="form-control"
          id="id"
          type="text"
          name="oldPAss"
          placeholder="Enter your old password"
        />
        <input
          style={{ margin: "20px auto", display: "block" }}
          class="form-control"
          type="text"
          name="newPass"
          placeholder="Enter your new password"
          onChange={e => {
            this.handleChange(e);
          }}
        />

        <button
          type="button"
          class="btn btn-outline-dark"
          onClick={e => {
            this.getUser(e);
            window.history.back();
          }}
        >
          Submit
        </button>

      </form>
              <Modal isOpen={this.state.modalIsOpen}>
              {/* <h5>{this.state.res}</h5> */}
              <ModalHeader>
                <button
                  class="alertClose"
                  style={{ position: "absolute", top: "5", right: "5" }}
                  type="button"
                  class="close"
                  onClick={() => {
                    this.toggleModal.bind(this);
                    window.location.replace(document.referrer)
                  }}
                  aria-label="Close"
                >
                 Ok
                </button>
              </ModalHeader>
    
              <ModalBody>{"waiting for Admin approval"}</ModalBody>
            </Modal>
            </div>
    );
  }
}
export default ChangePAss;
