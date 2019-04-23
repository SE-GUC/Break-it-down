import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
class AllRooms extends Component {
  // Initialize the state
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      coID: window.location.pathname.split("/").pop(),
      visible: true,
      modalIsOpen: false,
      updateModalIsOpen: false,
      createModalIsOpen: false,
      capacity: null,
      roomNumber: null,
      res: "",
      idx: null,
      idcs: null,
      createSchModalIsOpen: false,
      schno: null,
      schdate: null,
      schtime: null,
      schendtime: null,
      modal: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeRoomN = this.handleChangeRoomN.bind(this);
    this.handleChangesch1 = this.handleChangesch1.bind(this);
    this.handleChangesch2 = this.handleChangesch2.bind(this);
    this.handleChangesch3 = this.handleChangesch3.bind(this);
    this.handleChangesch4 = this.handleChangesch4.bind(this);
  }
  handleChangeRoomN(ev) {
    this.setState({ roomNumber: ev.target.value });
    console.log(ev);
  }
  handleChange(ev) {
    this.setState({ capacity: ev.target.value });
    console.log(ev);
  }
  handleChangesch1(e) {
    this.setState({ schno: e.target.value });
  }

  handleChangesch2(e) {
    this.setState({ schdate: e.target.value });
  }

  handleChangesch3(e) {
    this.setState({ schtime: e.target.value });
  }
  handleChangesch4(e) {
    this.setState({ schendtime: e.target.value });
  }
  getUser2 = e => {
    e.preventDefault();
    console.log(this.state.schno);
    let databody = {
      scheduleNumber: this.state.schno,
      Date: this.state.schdate,
      time: this.state.schtime,
      endTime: this.state.schendtime
      //  "reserved" : false,
      // "reservedBy" :[]
    };

    fetch(
      `/api/coworkingspace/createSchedule/${this.state.coID}/${
        this.state.idcs
      }`,
      {
        method: "POST",
        body: JSON.stringify(databody),
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
      .then(res => res.json())
      .then(data => console.log(data));
  };

  createRoom = ev => {
    ev.preventDefault();
    let databody = {
      roomNumber: this.state.roomNumber,
      capacity: this.state.capacity
    };
    console.log(databody);
    fetch(`/api/coworkingspace/createRoom/${this.state.coID}`, {
      method: "POST",
      body: JSON.stringify(databody),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => console.log(data));
  };

  updateRoom = ev => {
    ev.preventDefault();
    const c = this.state.capacity;
    const id = this.state.idx;
    console.log(c);
    console.log(ev.target);
    console.log(id);
    let databody = {
      // [c]/: ev.target.elements.value.value
      capacity: c
    };
    console.log(databody);
    const coID = this.state.coID;
    console.log(id);
    // const rID = this.props.match.params.rID;
    fetch(
      `/api/coworkingspace//updateRoom/${coID}/${id}`,
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
    console.log("Mariaaam");
  };

  // Fetch the list on first mount
  componentDidMount() {
    this.getRooms();
  }

  // Retrieves the list of items from the Express app
  getRooms = async () => {
    const coID = this.state.coID;
    console.log(coID);
    await fetch(`/api/coworkingSpace/viewAllRooms/${coID}`)
      .then(res => res.json())
      .then(rooms => this.setState({ rooms }));
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

  toggleUpdateModal() {
    this.setState({
      updateModalIsOpen: !this.state.updateModalIsOpen
    });
  }

  toggleCreateModal() {
    this.setState({
      createModalIsOpen: !this.state.createModalIsOpen
    });
  }

  toggleCreateSchModal() {
    this.setState({
      createSchModalIsOpen: !this.state.createSchModalIsOpen
    });
  }

  delete = (e, a) => {
    const coID = this.state.coID;
    e.preventDefault();
    const c = a;
    console.log(c);
    let databody = [c];
    console.log(databody);

    fetch(`/api/coworkingSpace/deleteRoom/${coID}/${c}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(json => this.setState({ res: json }));
    // this.getList()
  };

  render() {
    console.log(this.state.rooms);
    const coID = this.state.coID;
    console.log(this.state.coID);
    const { rooms } = this.state;

    return (
      <div className="App">
        <h1 style={{ "font-weight": "bold" }}>All available rooms </h1>
        <h5>
          Thinking about adding a new room?{" "}
          <button
            type="button"
            class="btn btn-outline-light"
            onClick={() => {
              this.toggleCreateModal();
            }}
            style={{ "font-weight": "bold" }}
          >
            YES!
          </button>
        </h5>
        <dev class="alert">
          <Modal class="modal fade" isOpen={this.state.createModalIsOpen}>
            <ModalHeader>
              <h5
                style={{ "font-weight": "boldest" }}
                class="modal-title"
                id="createRoomModalLongTitle"
              >
                New room details
              </h5>
              <button
                class="alertClose"
                style={{ position: "absolute", top: "5", right: "5" }}
                type="button"
                class="close"
                onClick={e => {
                  this.setState({
                    createModalIsOpen: !this.state.createModalIsOpen
                  });
                }}
                aria-label="Close"
              >
                &times;
              </button>
            </ModalHeader>
            <ModalBody>
              <div class="form-group">
                <label for="usr">Room number:</label>
                <input
                  type="number"
                  name="roomNumber"
                  // placeholder="Room number"
                  onChange={e => {
                    this.handleChangeRoomN(e);
                  }}
                  class="form-control"
                  id="usr"
                />
              </div>
              <div class="form-group">
                <label for="usr">Room capacity:</label>
                <input
                  type="text"
                  name="value"
                  // placeholder="Capacity"
                  onChange={e => {
                    this.handleChange(e);
                  }}
                  class="form-control"
                  id="usr"
                />
              </div>
            </ModalBody>

            <ModalFooter>
              <button
                class="btn btn-outline-dark"
                // getUser={e => this.getUser(e, el._id)}
                change={e => {
                  this.handleChange(e);
                }}
                result={this.state.res}
                onClick={e => {
                  this.createRoom(e);
                  window.location.reload();
                }}
              >
                Add room
              </button>
              <button
                class="btn btn-outline-secondary"
                change={e => {
                  this.handleChange(e);
                }}
                onClick={e => {
                  this.setState({
                    createModalIsOpen: !this.state.createModalIsOpen
                  });
                }}
              >
                Cancel
              </button>
            </ModalFooter>
          </Modal>
        </dev>
        &nbsp;
        {rooms.length ? (
          <div>
            {rooms.map(el => {
              return (
                <div key={el._id} class="card">
                  <h5 class="card-header">{"Room" + " " + el.roomNumber}</h5>
                  <div class="card-body">
                    <p class="card-text">{"Room capacity: " + el.capacity}</p>
                    <button
                      type="button"
                      class="btn btn-outline-dark"
                      onClick={() => {
                        this.toggleCreateSchModal();
                        this.setState({ idcs: el._id });
                      }}
                    >
                      Add a Schedule
                    </button>
                    <Modal isOpen={this.state.createSchModalIsOpen}>
                      <ModalHeader>
                        <h5
                          style={{ "font-weight": "bold" }}
                          class="modal-title"
                          id="createSchModalLongTitle"
                        >
                          New schedule details
                        </h5>
                        <button
                          class="alertClose"
                          style={{ position: "absolute", top: "5", right: "5" }}
                          type="button"
                          class="close"
                          onClick={e => {
                            this.setState({
                              createSchModalIsOpen: !this.state
                                .createSchModalIsOpen
                            });
                          }}
                          aria-label="Close"
                        >
                          &times;
                        </button>
                      </ModalHeader>
                      <ModalBody>
                        <div class="form-group">
                          <input
                            type="number"
                            name="value"
                            placeholder="Schedule number"
                            onChange={e => {
                              this.handleChangesch1(e);
                            }}
                            class="form-control"
                            id="usr"
                          />
                          <input
                            type="date"
                            name="value"
                            placeholder="Date"
                            onChange={e => {
                              this.handleChangesch2(e);
                            }}
                            class="form-control"
                            id="usr"
                          />
                          <input
                            type="number"
                            name="value"
                            placeholder="Time"
                            onChange={e => {
                              this.handleChangesch3(e);
                            }}
                            class="form-control"
                            id="usr"
                          />
                          <input
                            type="number"
                            name="value"
                            placeholder="EndTime"
                            onChange={e => {
                              this.handleChangesch4(e);
                            }}
                            class="form-control"
                            id="usr"
                          />
                        </div>
                      </ModalBody>
                      <ModalFooter>
                        <button
                          class="btn btn-outline-dark"
                          result={this.state.res}
                          onClick={e => {
                            this.getUser2(e);
                            window.location.reload();
                          }}
                        >
                          Create schedule
                        </button>
                        <button
                          class="btn btn-outline-secondary"
                          change={e => {
                            this.handleChange(e);
                          }}
                          onClick={e => {
                            this.setState({
                              createSchModalIsOpen: !this.state
                                .createSchModalIsOpen
                            });
                          }}
                        >
                          Cancel
                        </button>
                      </ModalFooter>
                    </Modal>
                    &nbsp;
                    <button
                      type="button"
                      class="btn btn-outline-dark"
                      onClick={() => {
                        this.toggleUpdateModal();
                        this.setState({ idx: el._id });
                      }}
                    >
                      Update Room
                    </button>
                    <Modal isOpen={this.state.updateModalIsOpen}>
                      <ModalHeader>
                        <h5
                          style={{ "font-weight": "bold" }}
                          class="modal-title"
                          id="createSchModalLongTitle"
                        >
                          Update details
                        </h5>
                        <button
                          class="alertClose"
                          style={{ position: "absolute", top: "5", right: "5" }}
                          type="button"
                          class="close"
                          onClick={e => {
                            this.setState({
                              updateModalIsOpen: !this.state.updateModalIsOpen
                            });
                          }}
                          aria-label="Close"
                        >
                          &times;
                        </button>
                      </ModalHeader>
                      <ModalBody>
                        <div class="form-group">
                          <label for="usr">Your new capacity value:</label>
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
                      </ModalBody>
                      <ModalFooter>
                        <button
                          class="btn btn-outline-dark"
                          // getUser={e => this.getUser(e, el._id)}
                          change={e => {
                            this.handleChange(e);
                          }}
                          result={this.state.res}
                          onClick={e => {
                            this.updateRoom(e);
                            window.location.reload();
                          }}
                        >
                          Update room
                        </button>
                        <button
                          class="btn btn-outline-secondary"
                          change={e => {
                            this.handleChange(e);
                          }}
                          onClick={e => {
                            this.setState({
                              updateModalIsOpen: !this.state.updateModalIsOpen
                            });
                          }}
                        >
                          Cancel
                        </button>
                      </ModalFooter>
                    </Modal>
                    &nbsp;
                    <Link
                      to={`/coworkingSpace/viewRoomSchedule/${coID}/${el._id}`}
                    >
                      <button type="button" class="btn btn-outline-dark">
                        View Schedule
                      </button>
                    </Link>
                    &nbsp;
                    <button
                      type="button"
                      onClick={this.toggleModal.bind(this)}
                      class="btn btn-outline-secondary"
                    >
                      Delete Room
                    </button>
                    <Modal isOpen={this.state.modalIsOpen}>
                      <ModalHeader>
                        <h5 style={{ "font-weight": "bold" }}>
                          Are you sure you want to delete this schedule
                        </h5>
                        <button
                          class="alertClose"
                          style={{ position: "absolute", top: "5", right: "5" }}
                          type="button"
                          class="close"
                          onClick={this.toggleModal.bind(this)}
                          aria-label="Close"
                        >
                          &times;
                        </button>
                      </ModalHeader>
                      <ModalBody>{"This action can not be undone."}</ModalBody>
                      <ModalFooter>
                        <button
                          onClick={e => {
                            this.delete(e, el._id);
                            window.location.reload();
                          }}
                          class="btn btn-outline-secondary"
                        >
                          Delete
                        </button>
                        <button
                          onClick={this.toggleModal.bind(this)}
                          class="btn btn-outline-dark"
                        >
                          Cancel
                        </button>
                      </ModalFooter>
                    </Modal>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div>
            <h2>No rooms are found.</h2>
          </div>
        )}
      </div>
    );
  }
}

export default AllRooms;
