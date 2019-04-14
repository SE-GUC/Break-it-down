import React, { Component } from "react";
import { Link } from "react-router-dom";

import { BrowserRouter as Route } from "react-router-dom";
import NavbarPage from "../components/Navbar";
class viewCoworkingSpaces extends Component {
  state = { list: [] };

  componentDidMount() {
    this.getList();
  }
  // Retrieves the list of items from the Express app
  getList = async () => {
    //const coID = this.props.match.params.coID;
    await fetch(`http://localhost:4000/api/member/PartnerCoworkingspaces/`)
      .then(res => res.json())
      .then(list => this.setState({ list }));
  };
  render() {
    const { list } = this.state;
    console.log(this.state.list);

    return (
      <div className="App">
        <Route>
          {" "}
          <div>
            {" "}
            <NavbarPage whichPage="coworkingspace" />{" "}
          </div>{" "}
        </Route>
        <h1>coworking space</h1>
        {list.map(el => (
          <div key={el.userID}>
            <Link to={`/specificCoworkingSpace/${el.userID}/`}>
              <button className="btn btn-primary btn-sm m-2">{el.name}</button>
            </Link>
            {" facilities: "}
            <span>{el.facilities}</span>
          </div>
        ))}
      </div>
    );
  }
}

export default viewCoworkingSpaces;
