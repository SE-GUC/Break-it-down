import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Alert,
  Container,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";

class List extends Component {
  // Initialize the state
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      visible: true,
      modalIsOpen: false,
      updateModalIsOpen: false,
      idx: null,
      field: null,
      value: null,
      roomNumber: null,
      res: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState({ value: e.target.value });
    console.log(e);
  }
  handleChangeEditField(e) {
    this.setState({ field: e.target.value });
    console.log(e);
  }

  // Fetch the list on first mount
  componentDidMount() {
    this.getList();
  }

  getUser = ev => {
    ev.preventDefault();
    const c = this.state.value;
    const field = this.state.field;
    console.log(c);
    console.log(field);

    let databody = {
      [field]: c
    };
    const id = this.state.idx;
    console.log(id);
    console.log(databody);
    const coID = this.props.match.params.coID;
    console.log(this.props.match.params.coID);
    const rID = this.props.match.params.rID;
    console.log(rID);
    console.log(JSON.stringify(databody));
    fetch(
      `http://localhost:4000/api/coworkingspace/updateSchedule/${coID}/${rID}/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(databody),
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
      .then(res => res.json())
      .then(json => this.setState({ res: json }));
  };

  toggleUpdateModal() {
    this.setState({
      updateModalIsOpen: !this.state.updateModalIsOpen
    });
  }

  // Retrieves the list of items from the Express app
  getList = async () => {
    const coID = this.props.match.params.coID;
    //console.log(this.props.match.params.coID)
    const rID = this.props.match.params.rID;
    console.log(rID);
    await fetch(
      `http://localhost:4000/api/coworkingspace/viewroomschedule/${coID}/${rID}`
    )
      .then(res => res.json())
      .then(list => this.setState({ list }));
    //  console.log(this.state.list)
  };

  toggleAlert() {
    this.setState({
      visible: !this.state.visible
    });
  }
  toggleModal() {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen
    });
  }

  delete = (e, a) => {
    const coID = this.props.match.params.coID;
    console.log(this.props.match.params.coID);
    const rID = this.props.match.params.rID;
    console.log(rID);
    e.preventDefault();
    const c = a;
    console.log(c);
    let databody = [c];
    console.log(databody);

    fetch(
      `http://localhost:4000/api/coworkingSpace/deleteSchedule/${coID}/${rID}/${c}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
      .then(res => res.json())
      .then(json => this.setState({ res: json }));
    // this.getList()
  };

  render() {
    const { list } = this.state;
    const coID = this.props.match.params.coID;
    //console.log(coID)
    const rID = this.props.match.params.rID;
    return (
      <div className="App">
        <h1>schedules</h1>
        {/* Check to see if any items are found*/}
        {list.length ? (
          <div>
            {/* Render the list of items */}
            {list.map(el => {
              return (
                <div key={el.id}>
                  <div
                    key={el._id}
                    class="card border-secondary mb-3"
                    style={{ width: "800px", margin: "0 auto" }}
                  >
                    <h5 class="card-header">
                      {"Schedule" + " " + el.scheduleNumber}
                    </h5>
                    <div class="card-body">
                      <p class="card-text">
                        {" "}
                        <div class="list-group">
                          <button
                            class="list-group-item list-group-item-action"
                            disabled={el.reserved}
                          >
                            {" Date: " + el.Date}
                          </button>
                          <button
                            class="list-group-item list-group-item-action"
                            disabled={el.reserved}
                          >
                            {" Time: " + el.time}
                          </button>
                          <button
                            class="list-group-item list-group-item-action"
                            disabled={el.reserved}
                          >
                            {" Reservation state: " + el.reserved}
                          </button>
                        </div>
                      </p>
                      <button
                        type="button"
                        class="btn btn-outline-info"
                        onClick={() => {
                          this.toggleUpdateModal();
                          this.setState({ idx: el._id });
                        }}
                        disabled={el.reserved}
                      >
                        Update Schedule
                      </button>
                      <Modal isOpen={this.state.updateModalIsOpen}>
                        <ModalBody>
                          {/* <form onSubmit={this.props.getUser}> */}
                          <div class="form-group">
                            <label for="usr">What do you want to edit:</label>
                            <input
                              type="text"
                              name="name"
                              placeholder="Date-time"
                              onChange={e => {
                                this.handleChangeEditField(e);
                              }}
                              class="form-control"
                              id="usr"
                            />
                          </div>

                          <div class="form-group">
                            {/* <label for="usr">Your new capacity value:</label> */}
                            <input
                              type="text"
                              name="value"
                              onChange={e => {
                                this.handleChange(e);
                              }}
                              class="form-control"
                              id="usr"
                            />
                          </div>

                          <button
                            class="btn btn-outline-success"
                            change={e => {
                              this.handleChange(e);
                            }}
                            result={this.state.res}
                            onClick={e => {
                              this.getUser(e);
                                window.location.reload();
                            }}
                          >
                            Submit update
                          </button>
                        </ModalBody>
                      </Modal>
                      &nbsp;
                      <button
                        type="button"
                        onClick={this.toggleModal.bind(this)}
                        class="btn btn-outline-danger"
                        disabled={el.reserved}
                      >
                        Delete Schedule
                      </button>
                      <Modal isOpen={this.state.modalIsOpen}>
                        <ModalHeader toggle={this.toggleModal.bind(this)}>
                          {"Are you sure you want to delete this schedule"}
                        </ModalHeader>
                        <ModalBody>{"This action can not be undone"}</ModalBody>
                        <ModalFooter>
                          <button
                            onClick={this.toggleModal.bind(this)}
                            class="btn btn-outline-info"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={e => {
                              this.delete(e, el._id);
                              window.location.reload();
                            }}
                            class="btn btn-outline-danger"
                          >
                            Delete
                          </button>
                          {/* </Link> */}
                        </ModalFooter>
                      </Modal>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div>
            <h2>You did not upload any schedules yet.</h2>
          </div>
        )}
      </div>
    );
  }
}

export default List;