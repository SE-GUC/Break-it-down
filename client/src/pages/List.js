import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Side from "../components/BasicSideNavBar";

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
      res: "",
      time: null,
      endTime:null,
      date: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleChangeStartTime = this.handleChangeStartTime.bind(this);
    this.handleChangeEndTime = this.handleChangeEndTime.bind(this);

  }
  handleChange(e) {
    this.setState({ value: e.target.value });
    console.log(e.target.value);
  }
  handleChangeStartTime(e) {
    this.setState({ time: e.target.value });
    console.log(e.target.value);
  }
  handleChangeEndTime(e) {
    this.setState({ endTime: e.target.value });
    console.log(e.target.value);
  }
  handleChangeDate(e) {
    this.setState({ date: e.target.value });
    console.log(e.target.value);
  }
  handleChangeEditField(e) {
    var elem = document.getElementById("mainDD");
    console.log(elem.value);
    if (e.target.id === "time") elem.value = "Time";
    else {
      elem.value = e.target.id;
    }
    this.setState({ field: e.target.id });
    console.log(e.target.id);
    console.log("Mariaam");
  }

  // Fetch the list on first mount
  componentDidMount() {
    this.getList();
    this.auth();
  }

  auth = async () => {
    
    const coID = this.state.coID;
    await fetch(
      `/api/coworkingSpace/viewCoworkingSpace/`
    )
      .then(res => res.json())
      .catch(error => {
        alert("Your session has expired. Please login again");
        window.location = "/";
        return error;
      });
    
  };
  getUser = ev => {
    ev.preventDefault();
    const c = this.state.value;
    const field = this.state.field;
    const time = this.state.time;
    const endTime = this.state.endTime;
    const date = this.state.date;
    console.log(endTime)
    console.log(date);
    console.log(time);
    let databody = {};
    if(time && endTime && date){
      databody = {
        time: time,
        Date: date,
        endTime: endTime
      };
    }
    else if (time && date) {
      databody = {
        time: time,
        Date: date
      };
    }
    else if (endTime && date) {
      databody = {
        endTime: endTime,
        Date: date
      };
    }
    else if (time && endTime) {
      databody = {
        time: time,
        endTime: endTime
      };
    }
    else if (time) {
      databody = {
        time: time
      };
    } else if (date) {
      databody = {
        Date: date
      };
    }
    else if(endTime){
      databody = {
        endTime: endTime
      };
    }

    const id = this.state.idx;
    console.log(id);
    console.log(databody);
    const coID = this.props.match.params.coID;
    console.log(this.props.match.params.coID);
    const rID = this.props.match.params.rID;
    console.log(rID);
    console.log(JSON.stringify(databody));
    fetch(
      `/api/coworkingspace/updateSchedule/${coID}/${rID}/${id}`,
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
      `/api/coworkingspace/viewroomschedule/${coID}/${rID}`
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
      `/api/coworkingSpace/deleteSchedule/${coID}/${rID}/${c}`,
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
      <Side />
        <h1 style={{ "font-weight": "bold"}}>All available schedules</h1>
        {/* Check to see if any items are found*/}
        {list.length ? (
          <div>
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
                          <a
                            class="list-group-item list-group-item-action"
                            disabled={el.reserved}
                          >
                            {" Date: " + el.Date}
                          </a>
                          <a
                            class="list-group-item list-group-item-action"
                            disabled={el.reserved}
                          >
                            {"Start time: " + el.time}
                          </a>
                          <a
                            class="list-group-item list-group-item-action"
                            disabled={el.reserved}
                          >
                            {"End time: " + el.endTime}
                          </a>
                          <a
                            class="list-group-item list-group-item-action"
                            disabled={el.reserved}
                          >
                            {" Reservation state: " + el.reserved}
                          </a>
                        </div>
                      </p>
                      <button
                        type="button"
                        class="btn btn-outline-dark"
                        onClick={() => {
                          this.toggleUpdateModal();
                          this.setState({ idx: el._id });
                        }}
                        disabled={el.reserved}
                      >
                        Update Schedule
                      </button>
                      <Modal isOpen={this.state.updateModalIsOpen}>
                        <ModalHeader>
       
                          <h4 style={{ "font-weight": "bold"}}>Update details</h4>
                          <button
                          style={{ position: "absolute", top: "5", right: "5" }}
                          type="button"
                          class="close"
                          onClick={() => {
                            this.toggleUpdateModal();
                          }}
                          aria-label="Close"
                        > &times;
                        </button>
                         <h6>Fill in the fields you want to update only.</h6>
                  
                        </ModalHeader>
                        <ModalBody>
                          <div class="input-group" style={{display:"block"}}>
                          <div>
                              <input
                                type="date"
                                name="value"
                                placeholder="Date"
                                onChange={e => {
                                  this.handleChangeDate(e);
                                }}
                                class="form-control"
                                id="usr"
                                onChange={e => {
                                  this.handleChangeDate(e);
                                }}
                              />
                            </div>
                            <div>
                            <input
                              type="text"
                              name="value"
                              placeholder="Start time"
                              onChange={e => {
                                this.handleChangeStartTime(e);
                              }}
                              class="form-control"
                              id="usr"
                            />
                          </div>
                          <div>
                            <input
                              type="text"
                              name="value"
                              placeholder="End time"
                              onChange={e => {
                                this.handleChangeEndTime(e);
                              }}
                              class="form-control"
                              id="usr"
                            />
                          </div>
                          </div>
                        </ModalBody>
                        <ModalFooter>
                          <button
                            class="btn btn-outline-dark"
                            change={e => {
                              this.handleChange(e);
                            }}
                            result={this.state.res}
                            onClick={e => {
                              this.getUser(e);
                              window.location.reload();
                            }}
                          >
                            Update schedule
                          </button>
                          <button
                            onClick={() => {
                              this.toggleUpdateModal();
                            }}
                            class="btn btn-outline-secondary"
                          >
                            Cancel
                          </button>
                        </ModalFooter>
                      </Modal>
                      &nbsp;
                      <button
                        type="button"
                        onClick={this.toggleModal.bind(this)}
                        class="btn btn-outline-secondary"
                        disabled={el.reserved}
                      >
                        Delete Schedule
                      </button>
                      <Modal isOpen={this.state.modalIsOpen}>
                        <ModalHeader >
                        <h6 style={{ "font-weight": "bold"}}>Are you sure you want to delete this schedule?</h6>
                        <button
       style={{ position: "absolute", top: "5", right: "5" }}
       type="button"
       class="close"
       onClick={() => {
         this.toggleModal();
       }}
       aria-label="Close"
     > &times;
     </button>
                        </ModalHeader>
                        <ModalBody>
                          <h6>This action can not be undone.</h6>
                        </ModalBody>
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
