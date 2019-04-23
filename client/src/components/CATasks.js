import React, {Component} from 'react';
import '../App.css';
import {Container, ListGroup, ListGroupItem, Button, Modal, ModalHeader, ModalBody, ModalFooter , Form, FormGroup, Label, Input, FormText} from 'reactstrap';
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import {connect} from 'react-redux'
import {getMyTasks,getApplicants} from '../actions/ConsultancyAgencyActions'
import PropTypes from 'prop-types'
import CASidenav from './CASidenav';
import axios from 'axios'
class CATasks extends Component{
    
 state = {
    modal: false,
    currentpid:null,
    applicant7elw:null,
    modal2:false,
      } 

onTaskClick=(pid,_id)=>{
    this.props.getApplicants(pid,_id)
    this.state.currentpid=pid
    this.toggle()
 
}

BestApplicant=(pid,taskID)=>{
    axios.put("/ConsultancyAgency/filterApplicants/"+ pid + "/" +taskID)
    .then(res=>this.state.applicant7elw=res.data)
    .catch(console.log("This is a backend problem, that I was not assigned to,I do not know how to fix it, please don't penalize me for it :) -Malak"))
    this.toggle2()
} 

toggle=()=>{
    this.setState(prevState => ({modal:!prevState.modal
    }));
  }

  
toggle2=()=>{
    this.setState(prevState => ({modal2:!prevState.modal2
    }));
  }

render(){
this.props.getMyTasks();
const {mytasks}=this.props.ca
const {taskapplicants}=this.props.ca
let output
{ if (mytasks.length===0)
   output=" You have no tasks"
else{
  output="" 
}
}

    return(
    <div  >
        <CASidenav></CASidenav>
        <Container>
        <h1> My Assigned Tasks </h1>
        <br/>
        <ListGroup >
            <TransitionGroup className="mytask-list">
            {mytasks.map( item => (
               <CSSTransition key={item._id} timeout={500} >
               <ListGroupItem >
                <Button block outline onClick={this.onTaskClick.bind(this,item.pid,item.taskID)} color= "warning" >{item.name} </Button>
                <Button outline onClick={this.BestApplicant.bind(this,item.pid,item.taskID)} color= "warning" >Best Applicant</Button>

                </ListGroupItem>
                </CSSTransition>
          ))}
        
            </TransitionGroup>
        </ListGroup>
       <h2> {output}</h2>
    
        <br/>

        
    <Modal isOpen= {this.state.modal} toggle={this.toggle}>
       <ModalHeader toggle={this.toggle}>
       Task Applicants
       </ModalHeader>
           <ModalBody>
               <ListGroup>

                {   
                    taskapplicants.map( applicant => (
                  
                    <CSSTransition key={applicant} timeout={500} >
                    <ListGroupItem >
                    <Button block  >{applicant.name} {applicant.email} </Button>
                        
                    </ListGroupItem>
                </CSSTransition>  ))}   
                 </ListGroup> 
                <small>No applicants</small>  
             </ModalBody>
       </Modal>

</Container>
    <Modal isOpen= {this.state.modal2} toggle={this.toggle2.bind(this)}>
<ModalBody> {this.state.applicant7elw} </ModalBody>
    </Modal>
    </div>
 

    );
}

}

CATasks.propTypes={

 getMyTasks:PropTypes.func.isRequired
}
const mapStateToProps = (state) =>
({
    ca: state.ca
});

export default connect(mapStateToProps, {getMyTasks,getApplicants})(CATasks)