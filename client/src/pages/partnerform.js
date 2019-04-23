import React from "react";
import PartnerSidenav from "../components/BasicSideNavBar";

const UserForm = props => {
  return (
    <form onSubmit={props.getUser}>
      <PartnerSidenav />

      <h1 style={{ color: "green" }}>Create a Task</h1>
      <input class="form-control"
        style={{ margin: "50px auto", display: "block" }}
        type="text"
        name="name"
        placeholder="name"
      />
      <input class="form-control"
        style={{ margin: "50px auto", display: "block" }}
        type="text"
        name="description"
        placeholder="description"
      />
      <input class="form-control"
        style={{ margin: "50px auto", display: "block" }}
        type="text"
        name="wantsConsultant"
        placeholder="wantsConsultant"
      />
      <input class="form-control"
        style={{ margin: "50px auto", display: "block" }}
        type="text"
        name="field"
        placeholder="field"
      />
              <div class="input-group mb-3">
                  <input
                        class="form-control"
                        placeholder=" skills"
                        onChange={props.change}
                        type="text"
                      />
                      <div class="input-group-append">
                      <button class="btn btn-outline-info" onClick={(e)=>{props.getUser2(e);}}>Add another skill</button>
                      </div>
                      </div>

      <button className="btn btn-success btn-sm m-2">Submit</button>
      <div
        class="alert alert-secondary"
        role="alert"
        style={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      >
        Copyright © 2019 Lirten Inc. All Rights Reserved.
      </div>
    </form>
  );
  /*
 
        <Link to={`./App/pages/Success`}>
          <Button variant="primary" size="lg" color="blue" active>
            Submit 
          </Button>
        </Link> 

  */
};

export default UserForm;
