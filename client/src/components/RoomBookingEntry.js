import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

class RoomBookingEntry extends Component {
  getStyle = () => {
    return {
      background: "#ffffff",
      padding: "10px",
      borderBottom: "1px #000000 solid",
      textDecoration: "none",
      textAlign: "center"
    };
  };

  render() {
    return (
      <div style={this.getStyle()}>
        <Card style={{ width: "100%" }}>
          <Card.Body>
            <p style={{ color: "#000000" }}>
              {this.props.roomBooking.coworkingSpaceName === undefined
                ? "Coworking Space: unknown "
                : "Coworking Space: " +
                  this.props.roomBooking.coworkingSpaceName}

              <br />

              {this.props.roomBooking.roomName === undefined
                ? "Room: unknown "
                : "Room: " + this.props.roomBooking.roomName}

              <br />

              {this.props.roomBooking.Date === undefined
                ? "Booking Date: unknown "
                : "Booking Date: " + this.props.roomBooking.Date}

              <br />

              {this.props.roomBooking.time === undefined
                ? "Booking time: unknown "
                : "Booking time: " + this.props.roomBooking.time}

              <br />

              <Link to={`/user/updateRoomBooking/${this.props.id}`}>
                <button type="button" class="btn btn-outline-warning">
                  Update
                </button>
              </Link>
            </p>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

RoomBookingEntry.propTypes = {
  roomBooking: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired
};

export default RoomBookingEntry;
