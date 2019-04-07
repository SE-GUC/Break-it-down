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
      <br/>
        <h1>Admin Home</h1>
        <br/>


        <Link to={`/CheckTaskDescriptions/${PID}/${TID}`}>
          <Button variant="info" size="lg" color="blue" active>
             Check a recently submitted Task Description
          </Button>
        </Link>  
      </div>
    );
  }
}
export default Home;
