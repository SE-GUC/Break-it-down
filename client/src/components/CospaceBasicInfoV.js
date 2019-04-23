import React, { Component } from "react";
import Shared from "../../src/Shared.jpg";
import {
  faPhone,
  faAt,
  faMapMarkerAlt,
  faCheck,
  faGlobe,
  faPencilAlt
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
class CoDesc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: {},
    //   coID: window.location.pathname.split("/").pop(),
      facilities: [],
      flag1: false,
      flag2: false,
      flag3: false,
      flag4: false,
      namee: "",
      closearr: [],
      closebtns: []
      // rID: this.props.match.params.rID
    };
    this.handleChange = this.handleChange.bind(this);
  }
  toggleEditing1() {
    this.setState({
      flag1: !this.state.flag
    });
  }
  toggleEditing2() {
    this.setState({
      flag2: !this.state.flag
    });
  }
  toggleEditing3() {
    this.setState({
      flag3: !this.state.flag
    });
  }
  toggleEditing4() {
    this.setState({
      flag4: !this.state.flag
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
    //console.log(coID)
    //   const rID = this.props.match.params.rID;
    // console.log(rID)
    const coID = this.props.coID
    await fetch(
      `/api/coworkingSpace/viewCoworkingSpace/${coID}`
    )
      .then(res => res.json())
      .then(info => this.setState({ info }));
    this.setState({
      facilities: this.state.info.facilities
    });
  };

  getUser = (e, a) => {
    e.preventDefault();
    const c = this.state.namee;

    // console.log("hiii");
    let databody = {
      [a]: c
    };
    console.log(databody);
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

    //      }
    return (
      <div>
        <Row>
          <FontAwesomeIcon icon={faPhone} />
          <p id="phone"> Phone:</p>
          {info.phoneNumber}
          
        </Row>
        <Row>
          <FontAwesomeIcon icon={faAt} />
          <p id="email"> Email:</p>
          {info.email}
         
        </Row>
        <Row>
          <FontAwesomeIcon icon={faMapMarkerAlt} />
          <p id="address"> Address:</p>
          {info.address}
         
        </Row>
        <Row>
          <FontAwesomeIcon icon={faGlobe} />
          <p id="website"> Website:</p>
          {info.website}

          
        </Row>
      </div>
    )
  }
    
}
export default CoDesc;
