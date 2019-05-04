import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import PartnerSidenav from "../components/BasicSideNavBar";

class partnermyRoomBookings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      descript: [],
      userID: this.props.match.params.userID,
      visible: true,
      modalIsOpen: false
    };
  }

  componentWillMount() {
    this.getDescription();
  }

  getDescription = async () => {
    const userID = this.props.match.params.userID;
    await fetch(`/api/partner/roombookings`)
      .then(res => res.json())
      .then(descript => this.setState({ descript }))
      .catch(error => {
        alert("Your session has expired. Please login again");
        window.location = "/";
        return error;
      });
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

  render() {
    const userID = this.state.userID;
    let descript = this.state.descript || [];

    return (
      <div className="App">
        <PartnerSidenav />
        <br />
        <h1> Your Room bookings </h1>
        <br />
        <br />

        {descript.length ? (
          <div>
            {descript.map(el => {
              return (
                <div key={el.roomID} class="card border-warning mb-3">
                  <h5 class="card-header">
                    {"Room Name:" + "  " + el.roomName}
                  </h5>
                  <div class="card-body">
                    <p class="card-text">
                      {"Cowrking Sapce Name:   " + el.coworkingSpaceName}
                    </p>
                    <p class="card-text">{"Date:   " + el.Date}</p>
                    <p class="card-text">{"Time:   " + el.time}</p>
                    <Link
                      to={`/cospace/rooms/${el.coworkingSpaceID}/${el.roomID}`}
                    >
                      <Button variant="primary" size="lg" color="blue" active>
                        View the schedule
                      </Button>
                    </Link>
                    &nbsp;
                    <br />
                    <br />
                    <Link to={`/RoomBookings/${el.bookingID}`}>
                      <Button variant="primary" size="lg" color="blue" active>
                        Delete booking
                      </Button>
                    </Link>
                    &nbsp;
                    <br />
                    <br />
                    <Link to={`/user/updateRoomBooking/${el.bookingID}`}>
                      <Button variant="primary" size="lg" color="blue" active>
                        Update booking
                      </Button>
                    </Link>
                    &nbsp;
                    <br />
                    <br />
                  </div>
                  <br />
                  <br />
                  <br />
                </div>
              );
            })}
          </div>
        ) : (
          <div>
            <br />
            <h2>you haven't booked yet</h2>
          </div>
        )}
        <br />
        <br />
        <br />
        <div
          class="alert alert-secondary"
          role="alert"
          style={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        >
          Copyright © 2019 Lirten Inc. All Rights Reserved.{" "}
        </div>
      </div>
    );
  }
}

export default partnermyRoomBookings;
