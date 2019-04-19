import React, { Component } from 'react';
import UpdateForm from './UpdateForm';


class Update extends Component {
    constructor(props){
        super(props);
        this.state = {
         namee:""
          
        }
        this.handleChange = this.handleChange.bind(this);
      }
      handleChange(e) {
        this.setState({namee:e.target.value});
      }
    getUser = (e) => {

        e.preventDefault();
        const c = this.state.namee;
        let a = []
        console.log(typeof(c))
        let databody ={

          [c] : e.target.elements.valuee.value

    }

       const coID = this.props.match.params.coID;
       fetch(`/api/coworkingspace//updateCospace/${coID}`, {
            method: 'PUT',
            body: JSON.stringify(databody),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(res => res.json())
        .then(data => console.log(data));
    
      }
    
      render() {
    
        return (
    
          <div className="App">
    
            
    
            <UpdateForm getUser={this.getUser} change={this.handleChange}/>
            
        </div>
    );
}
}
export default Update;