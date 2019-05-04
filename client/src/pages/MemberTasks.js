import React, { Component } from "react";
import { Link } from "react-router-dom";

import { BrowserRouter as Route } from "react-router-dom";
import NavbarPage from "../components/Navbar";
import MemberSide from "../components/BasicSideNavBar";
class MemberTasks extends Component {
  state = { list: [], type: "member", MID: "5ca00f9a1c9d4400009a80cf" };

  componentDidMount() {
    this.getList();
  }
  // Retrieves the list of items from the Express app
  getList = async () => {
    //const coID = this.props.match.params.coID;
    await fetch(`/api/member/alltasks/`)
      .then(res => res.json())
      .then(list => this.setState({ list }));
  };
  render() {
    let sidenav;

    sidenav = <MemberSide />;
    const { list } = this.state;
    console.log(this.state.list);

    return (
      <div className="App">
        <Route>
          {" "}
          <div>
            {" "}
            <MemberSide />
          </div>{" "}
        </Route>
        <h1>Tasks</h1>
        {list.map(el => (
          <div
            key={el.userID}
            class="card border-secondary mb-3"
            style={{ width: "800px", margin: "0 auto" }}
          >
            {/* <Link to={`/specificCoworkingSpace/${el._id}/`}>
              <button className="btn btn-primary btn-sm m-2">{el.name}</button>
            </Link> */}
            <h5 class="card-header">{"Name:" + " " + el.name}</h5>
            <br />
            <div class="list-group">
              <button
                class="list-group-item list-group-item-action"
                disabled={el.description}
              >
                {" Description: " + el.description}
              </button>
              <button
                class="list-group-item list-group-item-action"
                disabled={el.description}
              >
                {" field: " + el.field}
              </button>
              <Link to={`/Memberapplytasks/${el.partnerID}/${el.taskID}`}>
                <button variant="primary" size="lg" color="blue" active>
                  Apply for this tasks
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default MemberTasks;
