import React, { Component } from "react";
import { ProgressBar } from "react-bootstrap";
class lifeCycle extends Component {
  // Initialize the state
  constructor(props) {
    super(props);
    this.state = {
      list: []
    };
  }


  componentDidMount() {
    this.getList();
  }

 // Retrieves the list of items from the Express app
 getList = async () => {
  const PID = this.props.match.params.PID;
  const TID = this.props.match.params.TID;
  await fetch(`http://localhost:4000/api/partner/TaskLifeCycle/${PID}/${TID}`)
  .then(res => res.json())
  .then(list => this.setState({ list }));
  //console.log(this.state.list);
};

  render() {
    const { list } = this.state;
      console.log (list)
      if(list[0]==="true" && list[1]==="false" && list[2]==="false" && list[3]==="false"){
        return(
          <div className="App">
        <h1>Your Task's Life Cycle </h1>
         <ProgressBar>
         
         <div class="progress-bar bg-success" role="progressbar" style={{ width:"25%",color:"green" }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
  
          </ProgressBar>
        
      </div>
          
  
        );
        
      }
      if(list[0]==="true" && list[1]==="true" && list[2]==="false" && list[3]==="false"){
        return(
          <div className="App">
        <h1>Your Task's Life Cycle </h1>
         <ProgressBar>
         
         <div class="progress-bar bg-success" role="progressbar" style={{ width:"50%",color:"green" }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
  
          </ProgressBar>
        
      </div>
          
  
        );
      }
      if(list[0]==="true" && list[1]==="true" && list[2]==="true" && list[3]==="false"){
        return(
          <div className="App">
        <h1>Your Task's Life Cycle </h1>
         <ProgressBar>
         
         <div class="progress-bar bg-success" role="progressbar" style={{ width:"75%",color:"green" }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
  
          </ProgressBar>
        
      </div>
          
  
        );
      }
      if(list[0]==="true" && list[1]==="true" && list[2]==="true" && list[3]==="true"){
        return(
          <div className="App">
        <h1>Your Task's Life Cycle </h1>
         <ProgressBar>
         
          <div class="progress-bar bg-success" role="progressbar" style={{ width:"100%",color:"green" }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
  
          </ProgressBar>
        
      </div>
          
  
        );
      }
      return(
        <div className="App">
        <h1>Your Task's Life Cycle </h1>
      </div>
      );

  }
  
 
}



export default lifeCycle;

// {list.map(item => (
//   <li key={item}>{item}</li>
// ))}
