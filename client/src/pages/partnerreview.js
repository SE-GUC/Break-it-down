import React, { Component } from "react";
import ReviewForm from "./partnerform_review";
class partnerreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null
    };
  }

  getx = async e => {
    e.preventDefault();

    let databody = {
      rating: e.target.elements.rating.value,
      review: e.target.elements.review.value
    };

    const TID = this.props.match.params.TID;

    await fetch(`/api/partner/ReviewandRate/${TID}`, {
      method: "PUT",
      body: JSON.stringify(databody),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data =>
        //data => console.log(data)
        alert(data.error)
      )
      .catch(error => {
        alert("Your session has expired. Please login again");
        window.location = "/";
        return error;
      });
  };

  render() {
    console.log("hahahahaha");
    return (
      <div className="App">
        <ReviewForm getx={this.getx} change={this.handleChange} />
      </div>
    );
  }
}

export default partnerreview;

//<ReviewForm getx={this.getx} change={this.handleChange}/>
