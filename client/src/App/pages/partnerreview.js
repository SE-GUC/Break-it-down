import React, { Component } from 'react';
import ReviewForm from './partnerform_review';
class partnerreview extends Component {
    
    constructor(props){
        super(props);
        this.state = { 
        }
    }

        getx = async (e) => {

            e.preventDefault();
            
            let databody ={
            "rating" : e.target.elements.rating.value,
            "review" : e.target.elements.review.value,

        }
        const PID = this.props.match.params.PID
        const TID = this.props.match.params.TID

        await fetch(`/api/partner/ReviewandRate/${PID}/${TID}`, {
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
     
      console.log("hahahahaha")
        return (
    
          <div className="App">
        

           <ReviewForm getx={this.getx} change={this.handleChange}></ReviewForm>
      
        </div>
    );
    }




}
 
export default partnerreview;

//<ReviewForm getx={this.getx} change={this.handleChange}/>
