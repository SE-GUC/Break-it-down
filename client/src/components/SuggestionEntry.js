import React, { Component } from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";

class SuggestionEntry extends Component {
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
              {this.props.cospace.name === undefined
                ? "Coworking Space: unknown name "
                : "Coworking Space: " + this.props.cospace.name}
              <br />
              {this.props.cospace.email === undefined
                ? "Email: unknown "
                : "Email: " + this.props.cospace.email}
              <br />
              {this.props.cospace.address === undefined
                ? "Address: unknown "
                : "Address: " + this.props.cospace.address}
              <br />
              {this.props.cospace.website === undefined
                ? "Website: unknown "
                : "Website: " + this.props.cospace.website}
              <br />
              {this.props.cospace.phoneNumber === undefined
                ? "Phone number: unknown "
                : "Phone number: " + this.props.cospace.phoneNumber}
              <br />
              {this.props.cospace.description === undefined
                ? "Description: unknown "
                : "Description: " + this.props.cospace.description}
              <br />
              {this.props.cospace.facilities === undefined
                ? "Facilities: unknown "
                : "Facilities: " + this.props.cospace.facilities}
              <br />
              {this.props.cospace.rooms === undefined
                ? "Rooms: unknown "
                : "Rooms : " +
                  this.props.cospace.rooms.map(
                    room =>
                      "Capacity: " +
                      (room.capacity === undefined
                        ? "unknown"
                        : room.capacity) 
                  )}
              <br />
            </p>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

SuggestionEntry.propTypes = {
  cospace: PropTypes.object.isRequired
};

export default SuggestionEntry;
