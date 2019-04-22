import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { plus } from "react-icons-kit/icomoon/plus";

// import UpdateRoomForm from "./UpdateRoomForm";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class AllRooms extends Component {
  // Initialize the state
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
       coID: this.props.coID,
     
      capacity: null,
      roomNumber: null,
     
    };
}

  // Fetch the list on first mount
  componentDidMount() {
    this.getRooms();
  }


  // Retrieves the list of items from the Express app
  getRooms = async () => {
    const coID = this.props.coID;
    console.log("test "+coID);
    await fetch(`/api/coworkingSpace/viewAllRooms/${coID}`)
      .then(res => res.json())
      .then(rooms => this.setState({ rooms }));
  };

  
  render() {

    const { rooms } = this.state;
    const coID = this.state.coID
    return (
      <div className="App">
        <h1>All available rooms </h1>
        
        <dev class="alert">
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
                   
                    
                  </div>
                  <Link
                      to={`/coworkingSpace/viewRoomSchedulepublic/${coID}/${el._id}`}
                    >
                      <button type="button" class="btn btn-outline-dark">
                        View Schedule
                      </button>
                    </Link>
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
