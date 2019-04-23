import React, { Component } from "react";
import { Link } from "react-router-dom";

import { BrowserRouter as Route } from "react-router-dom";
import NavbarPage from "../components/Navbar";
import Side from "../components/BasicSideNavBar";
class viewCoworkingSpaces extends Component {
  state = { list: [], type: "member" };

  componentDidMount() {
    this.getList();
    this.auth();
}

auth = async () => {
  
  await fetch(
    `/api/coworkingSpace/viewCoworkingSpace/`
  )
    .then(res => res.json())
    .catch(error => {
      alert("Your session has expired. Please login again");
      window.location = "/";
      return error;
    });
  
};
  // Retrieves the list of items from the Express app
  getList = async () => {
    //const coID = this.props.match.params.coID;
    await fetch(`/api/member/viewAllMembers/`)
      .then(res => res.json())
      .then(list => this.setState({ list }));
  };
  render() {
    let sidenav;
    const { list } = this.state;
    console.log(this.state.list);

    return (
      <div className="App">
        <Side />
        <h1>Our Members</h1>
        {list.map(el => (
          <div key={el.userID} class="card" id="allcospaces">
            <Link to={`/specificMember/${el._id}/`}>
              <button className="btn btn-outline-dark">{el.name}</button>
            </Link>
            <div class="card-body" id="allcospaces2">
              {" skills: "}
              <span>{el.skills}</span>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default viewCoworkingSpaces;
