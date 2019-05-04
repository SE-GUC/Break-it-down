import React, { Component } from "react";

import { Link, BrowserRouter as Route } from "react-router-dom";
import NavbarPage from "../components/Navbar";
import MemberSide from "../components/BasicSideNavBar";
class MemberMyRoomBooking extends Component {
  // Initialize the state
  constructor(props) {
    super(props);
    this.state = {
      list: []
    };
  }

  // Fetch the list on first mount
  componentDidMount() {
    this.getList();
  }

  // Retrieves the list of items from the Express app
  getList = async () => {
    await fetch(`/api/member/roombookings/`)
      .then(res => res.json())
      .then(list => this.setState({ list }));
    //  console.log(this.state.list)
  };
  delete = (e, a) => {
    e.preventDefault();
    const c = a;
    console.log(c);
    let databody = [c];
    console.log(databody);

    fetch(`/api/member/RoomBookings/${c}/`, {
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
    const { list } = this.state;
    return (
      <div className="App">
        <Route>
          {" "}
          <div> </div>{" "}
          <div>
            <MemberSide />
          </div>
        </Route>
        <div>
          {/* Render the list of items */}
          {list.map(el => {
            return (
              <div>
                {"Date: "}
                <span>{el.Date}</span>
                <br />
                {"Time: "}
                <span>{el.time}</span>
                <br />
                <Link
                  to={{
                    pathname: `/specificCoworkingSpace/${el.coworkingSpaceID}/`
                  }}
                >
                  <button className="btn btn-primary btn-sm m-2">
                    {"Coworkingspace"}
                  </button>
                </Link>
                <Link to={`/RoomBookings/${el.bookingID}`}>
                  <button variant="primary" size="lg" color="blue" active>
                    Delete booking
                  </button>
                </Link>

                <br />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default MemberMyRoomBooking;
