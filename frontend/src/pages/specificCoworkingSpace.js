import React, { Component } from "react";

import { Link, BrowserRouter as Route } from "react-router-dom";
import NavbarPage from "../components/Navbar";
class List extends Component {
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
    await fetch(
      `http://localhost:4000/api/coworkingSpace/PartnerCoworkingspaces/${id}/`
    )
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
            <NavbarPage whichPage="coworkingspace" />{" "}
          </div>{" "}
        </Route>
        <h1>{list.name}</h1>
        <div>
          {/* Render the list of items */}
          {list.map(el => {
            return (
              <div key={el.userID}>
                {"id: "}
                <span>{el.userID}</span>
                <br />
                {"Name: "}
                <span>{el.name}</span>
                <br />
                {"facilities: "}
                <span>{el.facilities}</span>
                <br />
                {el.rooms.map(room => {
                  return (
                    <div key={room.id}>
                      <Link
                        to={{
                          pathname: `/specificRoom/${el.userID}/${room.id}`,
                          state: { name: el.name }
                        }}
                      >
                        <button className="btn btn-primary btn-sm m-2">
                          {el.id}
                        </button>
                      </Link>
                      {"Capacity: "}
                      <span>{room.capacity}</span>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default List;
