import React, { Component } from "react";

import { Link, BrowserRouter as Route } from "react-router-dom";
import NavbarPage from "../components/Navbar";
import MemberSidenav from "../components/MemberSidenav";
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
    const id = this.props.match.params.id;
    await fetch(`http://localhost:4000/api/partner/roombookings/${id}/`)
      .then(res => res.json())
      .then(list => this.setState({ list }));
    //  console.log(this.state.list)
  };

  render() {
    const { list } = this.state;
    return (
      <div className="App">
        <Route>
          {" "}
          <div>
            {" "}
            <NavbarPage whichPage="member" />
          </div>{" "}
          <div>
            <MemberSidenav />;
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
