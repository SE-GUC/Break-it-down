import React, { Component } from "react";
import Shared from "../../src/Shared.jpg";
  import {
    faPencilAlt
  } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  
class CoDesc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: {},
      coID: window.location.pathname.split("/").pop(),
      facilities: [],
      flag: false,
      namee: "",
      closearr: [],
      closebtns: []
      // rID: this.props.match.params.rID
    };
    this.handleChange = this.handleChange.bind(this);
  }
  toggleEditing() {
    this.setState({
      flag: !this.state.flag
    });
  }
  handleChange(e) {
    this.setState({ namee: e.target.value });
  }

  // Fetch the list on first mount
  componentDidMount() {
    this.getList();
  }

  // Retrieves the list of items from the Express app
  getList = async () => {
    const coID = this.state.coID;
    //console.log(coID)
    //   const rID = this.props.match.params.rID;
    // console.log(rID)
    await fetch(
      `/api/coworkingSpace/viewCoworkingSpace/`
    )
      .then(res => res.json())
      .then(info => this.setState({ info }));
    this.setState({
      facilities: this.state.info.facilities
    });
  };

  getUser = e => {
    e.preventDefault();
    const c = this.state.namee;

    console.log("hiii");
    let databody = {
        "description": c,
    };
    console.log(databody)
    const coID = this.state.coID;
    fetch(`/api/coworkingspace/updateCospace/${coID}`, {
      method: "PUT",
      body: JSON.stringify(databody),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(json => this.setState({ res: json }));
      
  };

  render() {
    const coID = this.state.coID;
    const { info } = this.state;
    const arr = this.state.facilities;
    // console.log(this.state.namee)
    if (this.state.flag) {
      return (
        // if (this.state.flag) {
        <div id="wrapper">
          <div id="first">
            <img src={Shared} className="img2" />
          </div>
          <div id="second">
            {/* <a class="btn btn-primary btn-sm" id="Edit">Edit</a> */}
            <h4>Why us</h4>
            <div class="input-group mb-3">
            <input
            class="form-control"
              placeholder="Edit bio"
              onChange={e => {this.handleChange(e)}}
              type="text"
            />
            <div class="input-group-append">
            <button
            class="btn btn-outline-info"
              onClick={e => {
                this.getUser(e);
                window.location.reload();
              }}
            >
              Done
            </button>
            </div>
            </div>
          </div>
        </div>
      );
    }
    //      }
    return (
        <div id="wrapper">
        <FontAwesomeIcon icon={faPencilAlt}
          variant="outline-info"
          id="ed1"
          onClick={this.toggleEditing.bind(this)}
        >
          
        </FontAwesomeIcon>
        <div id="first">
          <img src={Shared} className="img2" />
        </div>
        <div id="second">
          {/* <a class="btn btn-primary btn-sm" id="Edit">Edit</a> */}
          <h4>Why us</h4>
          <p>{info.description}</p>
        </div>
      </div>
    );
  }
  
}
export default CoDesc;
