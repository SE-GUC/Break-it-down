import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
class Home extends Component {
  state = {
    PID: 1,
    TID: 1,
    id:1
  };
  render() {
    const PID = this.state.PID;
    const TID = this.state.TID;
    const id = this.state.id;
    return (
      <div id="postData">
        <h1>Partner Home</h1>
        <p>
          <Link to={`/TaskLifeCycle/${PID}/${TID}`}>
          <Button variant="primary" size="lg" color="blue" active>
            View Task's Life cycle
          </Button>
        </Link>
        </p>
        <p>
          <Link to={`/createTask/${id}/`}>
          <Button variant="primary" size="lg" color="blue" active>
            Create a Task 
          </Button>
        </Link>
        </p>

        
      </div>
    );
  }
}
export default Home;
