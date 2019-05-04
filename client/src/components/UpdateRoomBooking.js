import React, { Component } from "react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Card } from "react-bootstrap";

class UpdateRoomBooking extends Component {
  state = {
    capacity: {},
    error: null
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  auth = async () => {
    await fetch(
      `/api/admin/viewAll`)
      .then(res => res.json())
      .catch(error => {
        alert("Your session has expired. Please login again");
        window.location = "/";
        return error;
      });
  };

  onSubmit(e) {
    e.preventDefault();
    const bid = this.props.match.params.BID;
    axios
      .put(`/api/coworkingSpace/update/booking/${bid}`, {
        capacity: this.state.capacity
      })
      .then(res => {
        alert("Your Room Booking was updated successfully!");
        window.location = "/roombookings";
      })
      .catch(error => {
        this.setState({ error });
        alert(error.message + ". Could not update room booking !");
      });
  }
  componentDidMount() {
    this.auth();
  }

  render() {
    return (
      <div className="UpdateRoomBooking" style={{ backgroundColor: "#ffffff" }}>
        <Card style={{ width: "100%" }}>
          <Card.Body>
            <h1 style={{ color: "#000000", textAlign: "center" }}>
              Update your booking{" "}
            </h1>

            <form onSubmit={this.onSubmit.bind(this)}>
              <div class="form-group" style={{ backgroundColor: "#ffffff" }}>
                <label
                  for="capacity"
                  style={{ color: "#000000", textAlign: "center" }}
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
              <button type="submit" class="btn btn-outline-secondary">
                Update
              </button>
            </form>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default UpdateRoomBooking;
