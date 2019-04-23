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
      date: null,
    };

  }


  // Fetch the list on first mount
  componentDidMount() {
    this.getList();
  }


  toggleBookModal(){
      this.setState({
          modalIsOpen : !this.state.modalIsOpen
      })
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

  book (sID) {
    const coID = this.props.match.params.coID;
    //console.log(this.props.match.params.coID)
    const rID = this.props.match.params.rID;
    // console.log("coID: " + coID)
    // console.log("rID: "+rID);
    // console.log("sID: "+ sID);
    // console.log("mID: "+this.state.mID)
    fetch(
      `/api/partner/cospace/rooms/${coID}/${rID}/${sID}`, {
        method: "PUT",
        body: JSON.stringify({}),
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => res.json())
      .then(json => this.setState({ res: json }));  

        console.log(this.state.res)
        this.toggleBookModal();
        this.setState({
            res:""
        })
    //  console.log(this.state.list)
  };

  
  render() {
    const { list } = this.state;
    const coID = this.props.match.params.coID;
    //console.log(coID)
    const rID = this.props.match.params.rID;
    return (
      <div className="App">
      <Side />
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
                          this.book(el._id);
                         
                        }}
                      >
                        Book Now
                      </button>

                      <Modal isOpen={this.state.modalIsOpen}>
                      {/* <h5>{this.state.res}</h5> */}
                      <ModalHeader>
                        <button
                          class="alertClose"
                          style={{ position: "absolute", top: "5", right: "5" }}
                          type="button"
                          class="close"
                          onClick={()=>{this.toggleBookModal.bind(this);
                            window.location.reload()}}
                          aria-label="Close"
                        >
                          &times;
                        </button>
                      </ModalHeader>
                      
                      <ModalBody>{this.state.res.data}</ModalBody>
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
