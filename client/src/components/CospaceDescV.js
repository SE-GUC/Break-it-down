import React, { Component } from "react";
import Shared from "../../src/Shared.jpg";
import {
    Jumbotron,
    Button,
    Badge,
    Card,
    Row,
    Container,
    Col,
    ButtonGroup
  
  } from "react-bootstrap";
  import {
    faPhone,
    faAt,
    faMapMarkerAlt,
    faCheck,
    faGlobe,
    faPencilAlt
  } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  
class CoDesc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: {},
    //   coID: window.location.pathname.split("/").pop(),
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
    // const coID = this.state.coID;
    //console.log(coID)
    //   const rID = this.props.match.params.rID;
    // console.log(rID)
    const coID = this.props.coID;
    await fetch(
      `/api/coworkingSpace/viewCoworkingSpace/${coID}`
    )
      .then(res => res.json())
      .then(info => this.setState({ info }));
    this.setState({
      facilities: this.state.info.facilities
    });
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
           
            </div>
            </div>
          </div>
        </div>
      );
    }
    //      }
    return (
        <div id="wrapper">
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
