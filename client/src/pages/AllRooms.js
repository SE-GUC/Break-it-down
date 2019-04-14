import React, { Component } from "react";
import { Link } from "react-router-dom";
class AllRooms extends Component {
  // Initialize the state
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      coID: this.props.match.params.coID
    };
  }

  // Fetch the list on first mount
  componentDidMount() {
    this.getRooms();
  }

  // Retrieves the list of items from the Express app
  getRooms = async () => {
    const coID = this.props.match.params.coID;
    console.log(coID);
    await fetch(`http://localhost:4000/api/coworkingSpace/viewAllRooms/${coID}`)
      .then(res => res.json())
      .then(rooms => this.setState({ rooms }));
  };

  render() {
    console.log(this.state.rooms);
    const coID = this.props.match.params.coID;
    console.log(this.props.match.params.coID);
    const { rooms } = this.state;

    return (
      <div className="App">
        <h1>All available rooms</h1>
        {/* Check to see if any items are found*/}
        {rooms.length ? (
          <div>
            {rooms.map(el => {
              return (
                <div key={el.id}>
                  {"name: "}
                  <span>{"Room"+el.id}</span>
                  {" "}
                  <Link to={`/coworkingSpace/viewRoom/${coID}/${el.id}`}>
                    <button className="btn btn-danger btn-sm m-2">
                      View Room
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
