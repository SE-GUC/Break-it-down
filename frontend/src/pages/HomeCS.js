import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class HomeCS extends Component {
  state = {
    coID:300,
    rID:2
  }
  render() {
    const coID = this.state.coID;
    const rID = this.state.rID;
    return (
    <div id="postData">
      <h1>coworkingSpace Home</h1>
      {/* Link to List.js */}
      <Link to={`/coworkingSpace/create/${coID}`}>
        <button type="submit" className="btn btn-success btn-sm m-2">Create a Room</button>
      </Link>

      <Link to={`/coworkingSpace/viewAllRooms/${coID}`}>
      <button className="btn btn-danger btn-sm m-2">
            View my Rooms
        </button>
      </Link>

      <Link to={`/coworkingSpace/viewInfo/${coID}`}>
      <button className="btn btn-primary btn-sm m-2">
            View info
        </button>
      </Link>
    </div>
    );
  }
}
export default HomeCS;
