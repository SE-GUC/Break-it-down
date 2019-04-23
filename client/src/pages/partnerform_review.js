import React from "react";
import PartnerSidenav from "../components/BasicSideNavBar";

const ReviewForm = props => {
  return (
    <form onSubmit={props.getx}>
      <PartnerSidenav />

      <h1 style={{ color: "green" }}>Review Your assigned applicant</h1>
      <input
        style={{ margin: "50px auto", display: "block" }}
        type="number"
        name="rating"
        placeholder="rating"
      />
      <input
        style={{ margin: "50px auto", display: "block" }}
        type="text"
        name="review"
        placeholder="review"
      />

      <button className="btn btn-warning">Submit review</button>

      <div
        class="alert alert-secondary"
        role="alert"
        style={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      >
        Copyright © 2019 Lirten Inc. All Rights Reserved.
      </div>
    </form>
  );
};

export default ReviewForm;
