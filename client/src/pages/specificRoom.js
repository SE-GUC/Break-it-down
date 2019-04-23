import React, { Component } from "react";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavbarPage from "../components/Navbar";
import MemberSidenav from "../components/BasicSideNavBar";
class specificRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      name: this.props.location.state.name
    };
  }
  componentDidMount() {
    this.getList();
  }
  // Retrieves the list of items from the Express app
  getList = async () => {
    const Coid = this.props.match.params.Coid;
    const Roid = this.props.match.params.Roid;
    await fetch(
      `/api/member/cospace/rooms/${Coid}/${Roid}`
    )
      .then(res => res.json())
      .then(list => this.setState({ list }))
      .catch(err => console.log(err));
  };

  render() {
    const { list } = this.state;
    return (
      <div className="App">
        <Route>
          {" "}
          <div>
            {" "}
            <NavbarPage whichPage="coworkingspace" /> <MemberSidenav />;
          </div>{" "}
        </Route>
        <h1>{this.state.name}</h1>
        <div>
          {/* Render the list of items */}
          {list.map(el => {
            return (
              <div key={el.id}>
                {"id: "}
                <span>{el.id}</span>
                <br />
                {"Date: "}
                <span>{el.Date}</span>
                <br />
                {"Time: "}
                <span>{el.Time}</span>
                <br />
                {"Reserved: "}
                <span>{el.reserved}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
export default specificRoom;
