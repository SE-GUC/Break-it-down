import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

class Home extends Component {
  state = {
    PID: 1,
    TID: 0
  };

  render() {
    const PID = this.state.PID;
    const TID = this.state.TID;

    return (
      <div id="postData">
        <br />
        <h1>Admin Home</h1>
        <br />

        <Link to={`/CheckTaskDescriptions/${PID}/${TID}`}>
          <Button variant="info" size="lg" color="blue" active>
            Check a recently submitted Task Description
          </Button>
        </Link>
        <h1>coworkingSpace Home</h1>
        {/* Link to List.js */}
        <Link to={`/coworkingSpace/create/${coID}`}>
          <button type="submit" className="btn btn-success btn-sm m-2">
            Create a Room
          </button>
        </Link>

        <Link to={`/coworkingSpace/viewAllRooms/${coID}`}>
          <button className="btn btn-danger btn-sm m-2">View my Rooms</button>
        </Link>

        <Link to={`/coworkingSpace/viewInfo/${coID}`}>
          <button className="btn btn-primary btn-sm m-2">View info</button>
        </Link>
      </div>
    );
  }
}
export default Home;
