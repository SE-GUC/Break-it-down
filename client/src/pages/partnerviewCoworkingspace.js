import React, { Component } from "react";
import { Link } from "react-router-dom";

import { BrowserRouter as Route } from "react-router-dom";
import PartnerSidenav from "../components/BasicSideNavBar";
class partnerviewCoworkingSpaces extends Component {
  state = { list: [], type: "member" };

  componentDidMount() {
    this.getList();
  }
  // Retrieves the list of items from the Express app
  getList = async () => {
    await fetch(`/api/partner/PartnerCoworkingspaces/`)
      .then(res => res.json())
      .then(list => this.setState({ list }))
      .catch(error => {
        alert("Your session has expired. Please login again");
        window.location = "/";
        return error;
      });
  };
  render() {
    const { list } = this.state;
    console.log(this.state.list);

    return (
      <div className="App">
        <PartnerSidenav />
        <Route>
          {" "}
          <div> </div>{" "}
        </Route>
        <h1>coworking space</h1>
        {list.map(el => (
          // <div key={el.userID}>
          //   <Link to={`/specificCoworkingSpace/${el._id}/`}>
          //     <button className="btn btn-primary btn-sm m-2">{el.name}</button>
          //   </Link>
          //   {" facilities: "}
          //   <span>{el.facilities}</span>
          // </div>
          <div key={el.userID} class="card" id="allcospaces">
            <Link to={`/specificCoworkingSpace/${el._id}/`}>
              <button className="btn btn-outline-dark">{el.name}</button>
            </Link>
            <div class="card-body" id="allcospaces2">
              {" address: "}
              <span>{el.address}</span>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
export default partnerviewCoworkingSpaces;
// getList = async () => {

//   await fetch(`http://localhost:4000/api/partner/PartnerCoworkingspaces/`)
//     .then(res => res.json())
//     .then(list => this.setState({ list }));
// };
// render() {
