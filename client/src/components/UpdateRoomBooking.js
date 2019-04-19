import React, { Component } from "react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

class UpdateRoomBooking extends Component {
  state = {
    capacity: {},
    error: null
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  //id will change to generic type when linking  `/api/coworkingSpace/update/booking/${bid}/${uid}`
  onSubmit(e) {
	e.preventDefault();
    axios
      .put(
        "/api/coworkingSpace/update/booking/4/5c9113101c9d440000a926cc", { capacity: this.state.capacity })
      .then(res => {
        alert("Your Room Booking was updated successfully!");
      })
      .catch(error =>{
        this.setState({error})
        alert(error.message+". Could not update room booking !");
      });
  }

  render() {
    return (
      <div className="UpdateRoomBooking" style={{ backgroundColor: "#FFFFEB" }}>
        <h1 style={{ color: "#005a73", textAlign: "center" }}>
          Update your booking{" "}
        </h1>

        <form onSubmit={this.onSubmit.bind(this)}>
          <div class="form-group" style={{ backgroundColor: "#FFFFEB" }}>
            <label
              for="capacity"
              style={{ color: "#005a73", textAlign: "center" }}
            >
              Capacity
            </label>
            <input
              type="number"
              class="form-control"
              id="capacity"
              aria-describedby="emailHelp"
              placeholder="Enter capacity"
              name="capacity"
              onChange={this.onChange.bind(this)}
            />
          </div>
          <button type="submit" class="btn btn-outline-warning">
            Update
          </button>
        </form>
      </div>
    );
  }
}

export default UpdateRoomBooking;
