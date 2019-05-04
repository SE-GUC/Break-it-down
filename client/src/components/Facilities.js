import React, { Component } from "react";
class Facilities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: {},
      coID: this.props.coID,
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
    const coID = this.props.coID;
    await fetch(`/api/coworkingSpace/viewCoworkingSpace/${coID}`)
      .then(res => res.json())
      .then(info => this.setState({ info }));
    this.setState({
      facilities: this.state.info.facilities
    });
  };
  delete = (e, a) => {
    const coID = this.state.coID;
    e.preventDefault();
    const c = a;
    console.log(c);
    let databody = [c];
    console.log(databody);

    fetch(`/api/coworkingSpace/deletefacility/${coID}`, {
      method: "DELETE",
      body: JSON.stringify(databody),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(json => this.setState({ res: json }));
    //  this.getList()
  };

  getUser = e => {
    const coID = this.state.coID;
    e.preventDefault();
    const c = this.state.namee;
    console.log(c);
    let databody = [c];
    console.log(databody);

    fetch(`/api/coworkingSpace/addfacility/${coID}`, {
      method: "POST",
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
    if (this.state.flag) {
      return (
        <div id="postData">
          <div id="facilities">
            <h3 id="title">Facilities</h3>
            <div class="input-group mb-3">
              <input
                class="form-control"
                placeholder="new Facility"
                onChange={this.handleChange}
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
            {/* <span>{this.state.closearr}</span> */}
            {arr.length ? (
              <div>
                {arr.map(el => {
                  return (
                    <div>
                      <li id="list">
                        {el}{" "}
                        <button
                          className="close"
                          onClick={e => {
                            this.delete(e, el);
                            // this.props.history.push("/coworkingSpace/");
                            window.location.reload();
                          }}
                        >
                          x
                        </button>
                      </li>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div>
                <h2>No List Items Found</h2>
              </div>
            )}
            <br />
          </div>
        </div>
      );
    }
    return (
      <div id="postData">
        <div id="facilities">
          <h3 id="title">
            Facilities {""}
            <button
              className="btn btn-success btn-sm"
              // id="addF"
              onClick={this.toggleEditing.bind(this)}
            >
              +
            </button>
          </h3>
          {/* <span>{this.state.closearr}</span> */}
          {arr.length ? (
            <div>
              {arr.map(el => {
                return (
                  <div>
                    <li id="list">
                      {el}{" "}
                      <button
                        className="close"
                        onClick={e => {
                          this.delete(e, el);
                          window.location.reload();
                        }}
                      >
                        x
                      </button>
                    </li>
                  </div>
                );
              })}
            </div>
          ) : (
            <div>
              <h2>No List Items Found</h2>
            </div>
          )}
          <br />
        </div>
      </div>
    );
  }
}
export default Facilities;
