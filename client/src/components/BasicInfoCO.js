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
      coID: window.location.pathname.split("/").pop(),
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
    await fetch(
      `/api/coworkingSpace/viewCoworkingSpace/`
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
    if (this.state.flag1) {
      return (
        <div>
          <Row>
          <div class="input-group mb-3">
            <FontAwesomeIcon icon={faPhone} />
            <p> Phone:</p>
            <input
            class="form-control"
              placeholder="Edit phone number"
              onChange={e => {
                this.handleChange(e);
              }}
              type="number"
            />
            <div class="input-group-append">
            <button
            class="btn btn-outline-info"
              onClick={e => {
                this.getUser(e, "phoneNumber");
                window.location.reload();
              }}
            >
              Done
            </button>
            </div>
            </div>
          </Row>
          <Row>
            <FontAwesomeIcon icon={faAt} />
            <p id="email"> Email:</p>
            {info.email}
            <FontAwesomeIcon
              icon={faPencilAlt}
              variant="outline-info"
              onClick={this.toggleEditing2.bind(this)}
            >
              <FontAwesomeIcon icon={faPencilAlt} />
            </FontAwesomeIcon>
          </Row>
          <Row>
            <FontAwesomeIcon icon={faMapMarkerAlt} />
            <p id="address"> Address:</p>
            {info.address}
            <FontAwesomeIcon
              icon={faPencilAlt}
              variant="outline-info"
              onClick={this.toggleEditing3.bind(this)}
            >
              <FontAwesomeIcon icon={faPencilAlt} />
            </FontAwesomeIcon>
          </Row>
          <Row>
            <FontAwesomeIcon icon={faGlobe} />
            <p id="website"> Website:</p>
            {info.website}
            <FontAwesomeIcon
              icon={faPencilAlt}
              variant="outline-info"
              onClick={this.toggleEditing4.bind(this)}
            >
              <FontAwesomeIcon icon={faPencilAlt} />
            </FontAwesomeIcon>
          </Row>
        </div>
      );
    } else if (this.state.flag2) {
      return (
        <div>
          <Row>
            <FontAwesomeIcon icon={faPhone} />
            <p id="phone"> Phone:</p>
            {info.phoneNumber}
            <FontAwesomeIcon
              icon={faPencilAlt}
              variant="outline-info"
              onClick={this.toggleEditing1.bind(this)}
            />
          </Row>
          <Row>
          <div class="input-group mb-3">
            <FontAwesomeIcon icon={faAt} />
            <p> Email:</p>
            <input
            class="form-control"
              placeholder="Edit Email"
              onChange={e => {
                this.handleChange(e);
              }}
              type="text"
            />
            <div class="input-group-append">
            <button
            class="btn btn-outline-info"
              onClick={e => {
                this.getUser(e, "email");
                window.location.reload();
              }}
            >
              Done
            </button>
            </div>
            </div>
          </Row>
          <Row>
            <FontAwesomeIcon icon={faMapMarkerAlt} />
            <p id="address"> Address:</p>
            {info.address}
            <FontAwesomeIcon
              icon={faPencilAlt}
              variant="outline-info"
              onClick={this.toggleEditing3.bind(this)}
            />
          </Row>
          <Row>
            <FontAwesomeIcon icon={faGlobe} />
            <p id="website"> Website:</p>
            {info.website}
            <FontAwesomeIcon
              icon={faPencilAlt}
              variant="outline-info"
              onClick={this.toggleEditing4.bind(this)}
            />
          </Row>
        </div>
      );
    } else if (this.state.flag3) {
      return (
        <div>
          <Row>
            <FontAwesomeIcon icon={faPhone} />
            <p id="phone"> Phone:</p>
            {info.phoneNumber}
            <FontAwesomeIcon
              icon={faPencilAlt}
              variant="outline-info"
              onClick={this.toggleEditing1.bind(this)}
            />
          </Row>
          <Row>
            <FontAwesomeIcon icon={faAt} />
            <p id="email"> Email:</p>
            {info.email}
            <FontAwesomeIcon
              icon={faPencilAlt}
              variant="outline-info"
              onClick={this.toggleEditing2.bind(this)}
            />
          </Row>
          <Row>
            <div class="input-group mb-3">
              <FontAwesomeIcon icon={faMapMarkerAlt} />
              <p id="address"> Address:</p>
              <input
                class="form-control"
                placeholder="Edit Address"
                onChange={e => {
                  this.handleChange(e);
                }}
                type="text"
              />
              <div class="input-group-append">
                <button
                  class="btn btn-outline-info"
                  onClick={e => {
                    this.getUser(e, "address");
                    window.location.reload();
                  }}
                >
                  Done
                </button>
              </div>
            </div>
          </Row>
          <Row>
            <FontAwesomeIcon icon={faGlobe} />
            <p id="website"> Website:</p>
            {info.website}
            <FontAwesomeIcon
              icon={faPencilAlt}
              variant="outline-info"
              onClick={this.toggleEditing4.bind(this)}
            />
          </Row>
        </div>
      );
    } else if (this.state.flag4) {
      return (
        <div>
          <Row>
            <FontAwesomeIcon icon={faPhone} />
            <p id="phone"> Phone:</p>
            {info.phoneNumber}
            <FontAwesomeIcon
              icon={faPencilAlt}
              variant="outline-info"
              onClick={this.toggleEditing1.bind(this)}
            />
          </Row>
          <Row>
            <FontAwesomeIcon icon={faAt} />
            <p id="email"> Email:</p>
            {info.email}
            <FontAwesomeIcon
              icon={faPencilAlt}
              variant="outline-info"
              onClick={this.toggleEditing2.bind(this)}
            />
          </Row>
          <Row>
            <FontAwesomeIcon icon={faMapMarkerAlt} />
            <p id="address"> Address:</p>
            {info.address}
            <FontAwesomeIcon
              icon={faPencilAlt}
              variant="outline-info"
              onClick={this.toggleEditing3.bind(this)}
            />
          </Row>
          <Row>
            <div class="input-group mb-3">
              <FontAwesomeIcon icon={faGlobe} />

              <p id="website"> Website:</p>

              <input
                class="form-control"
                placeholder="Edit website"
                onChange={e => {
                  this.handleChange(e);
                }}
                type="text"
              />
              <div class="input-group-append">
                <button
                  class="btn btn-outline-info"
                  onClick={e => {
                    this.getUser(e, "website");
                    window.location.reload();
                  }}
                >
                  Done
                </button>
              </div>
            </div>
          </Row>
        </div>
      );
    }
    //      }
    return (
      <div>
        <Row>
          <FontAwesomeIcon icon={faPhone} />
          <p id="phone"> Phone:</p>
          {info.phoneNumber}
          <FontAwesomeIcon
            icon={faPencilAlt}
            type="btn"
            variant="outline-info"
            onClick={this.toggleEditing1.bind(this)}
          >
            {/* <FontAwesomeIcon icon={faPencilAlt} /> */}
          </FontAwesomeIcon>
        </Row>
        <Row>
          <FontAwesomeIcon icon={faAt} />
          <p id="email"> Email:</p>
          {info.email}
          <FontAwesomeIcon
            icon={faPencilAlt}
            variant="outline-info"
            onClick={this.toggleEditing2.bind(this)}
          >
            {/* <FontAwesomeIcon icon={faPencilAlt} /> */}
          </FontAwesomeIcon>
        </Row>
        <Row>
          <FontAwesomeIcon icon={faMapMarkerAlt} />
          <p id="address"> Address:</p>
          {info.address}
          <FontAwesomeIcon
            icon={faPencilAlt}
            variant="outline-info"
            onClick={this.toggleEditing3.bind(this)}
          >
            {/* <FontAwesomeIcon icon={faPencilAlt} /> */}
          </FontAwesomeIcon>
        </Row>
        <Row>
          <FontAwesomeIcon icon={faGlobe} />
          <p id="website"> Website:</p>
          {info.website}

          <FontAwesomeIcon
            id="FA"
            icon={faPencilAlt}
            variant="outline-info"
            onClick={this.toggleEditing4.bind(this)}
          >
            {/* <FontAwesomeIcon icon={faPencilAlt} /> */}
          </FontAwesomeIcon>
        </Row>
      </div>
    );
  }
}
export default CoDesc;
