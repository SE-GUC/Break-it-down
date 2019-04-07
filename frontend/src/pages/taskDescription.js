import React, { Component } from "react";
import {ListGroup} from "react-bootstrap";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";


class taskDescription extends Component {
  // Initialize the state
  constructor(props) {
    super(props);
    this.state = {
      descript: []
    };
  }


  componentWillMount() {
    this.getDescription();
  }

  getDescription = async () => {
    const PID = this.props.match.params.PID;
    const TID = this.props.match.params.TID;
    await fetch(`http://localhost:4000/api/admin/CheckTaskDescriptions/${PID}/${TID}`)
    .then(res => res.json())
    .then(descript => this.setState({ descript }));
  //  console.log(this.state.description);
  };


  render() {
   //const { descript } = this.state;

   let descript = this.state.descript || {}

    return (
      
      <div className="App">
        <h1> Submitted Task's Description </h1>
        {console.log(descript)}
  
        <ListGroup>
            
        <ListGroup.Item variant="info">Name:  { descript.name }</ListGroup.Item>
        <ListGroup.Item variant="light">Description:  { descript.description }</ListGroup.Item>
        <ListGroup.Item variant="info">Wants Consultancy:  { JSON.stringify(descript.wantsConsultant) }</ListGroup.Item>
        <ListGroup.Item variant="light">Field:  { descript.field } </ListGroup.Item>
        <ListGroup.Item variant="info">Skills:  { descript.skills} </ListGroup.Item>
        </ListGroup>
        <br/>


     
        <Link to={'/'}>
           <Button variant="info">Done </Button>

        </Link> 
   
       
      </div>
    );
  }
}

  export default taskDescription;
