import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
// import UpdateRoomForm from "./UpdateRoomForm";
import {
faPlusCircle
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class AllRooms extends Component {
  // Initialize the state
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      coID: this.props.coID,
      visible: true,
      modalIsOpen: false,
      updateModalIsOpen: false,
      capacity: null,
      roomNumber: null,
      res: "",
      idx:null
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(ev) {
    this.setState({ capacity: ev.target.value });
    console.log(ev);
  }

  getUser = (ev) => {
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
    const coID = this.props.coID;
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
    const coID = this.props.coID;
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

  delete = (e, a) => {
    const coID = this.props.coID;
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

  // deleteRoom = async rID => {
  //   const coID = this.props.match.params.coID;
  //   //console.log(coID)
  //   //  const rID = this.props.match.params.rID;
  //   console.log(rID);
  //   fetch(
  //     `/api/coworkingSpace/deleteRoom/${coID}/${rID}`,
  //     {
  //       method: "DELETE",
  //       // body: JSON.stringify(databody),
  //       headers: {
  //         "Content-Type": "application/json"
  //       }
  //     }
  //   )
  //     .then(res => this.setState({ deleted: true }))
  //     .then(console.log("Deleted"))
  //     .catch(err => console.log(err));
  // };

  render() {
    console.log(this.state.rooms);
    const coID = this.props.coID;
    console.log(this.props.coID);
    const { rooms } = this.state;

    return (
      <div className="App">
        <h1>
          All available rooms{" "}
          <Link to={`/coworkingSpace/create/${coID}`}>
            {" "}
            <FontAwesomeIcon icon={faPlusCircle} />{" "}
          </Link>
        </h1>
        {/* Check to see if any items are found*/}
        {rooms.length ? (
          <div>
            {rooms.map(el => {
              return (
                <div key={el._id} class="card">
                  <h5 class="card-header">{"Room" + " " + el.roomNumber}</h5>
                  <div class="card-body">
                    <p class="card-text">{"Room capacity: " + el.capacity}</p>
                    <Link
                      to={`/coworkingSpace/createSchedule/${coID}/${el._id}`}
                    >
                      <button type="button" class="btn btn-outline-info">
                        Add a Schedule
                      </button>
                    </Link>
                    &nbsp;
                    {/* <Link
                      to={`/coworkingSpace/updateRoom/${coID}/${el._id}`}
                    > */}
                    <button
                      type="button"
                      class="btn btn-outline-info"
                      onClick={()=>{this.toggleUpdateModal(); this.setState({idx:el._id})}}
                    >
                      Update Room
                    </button>
                    {/* </Link> */}
                    <Modal isOpen={this.state.updateModalIsOpen}>
                      {/* <ModalHeader toggle={this.toggleUpdateModal.bind(this)}>
                        {"Are you sure you want to delete this schedule"}
                      </ModalHeader> */}
                      <ModalBody>
                        {/* <div class="form-group">
                          <label for="usr">What do you want to edit:</label>
                          <input
                            type="text"
                            name="name"
                            // onChange={this.props.change}
                            class="form-control"
                            id="usr"
                          />
                        </div> */}
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

                        <button
                          class="btn btn-outline-success"
                          // getUser={e => this.getUser(e, el._id)}
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
                      <ModalFooter>{/* </Link> */}</ModalFooter>
                    </Modal>
                    &nbsp;
                    <Link
                      to={`/coworkingSpace/viewRoomSchedule/${coID}/${el._id}`}
                    >
                      <button type="button" class="btn btn-outline-info">
                        View Schedule
                      </button>
                    </Link>
                    &nbsp;
                    <button
                      type="button"
                      onClick={this.toggleModal.bind(this)}
                      class="btn btn-outline-danger"
                    >
                      Delete Room
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
              );
            })}
          </div>
        ) : (
          <div>
            <h2>No room is found.</h2>
          </div>
        )}
      </div>
    );
  }
}

export default AllRooms;
