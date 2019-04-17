import React, { Component } from "react";
import { Nav, Navbar, Form, FormControl, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo2 from "../Logo2.png";
import axios from "axios";

class NavbarPage extends Component {
    state = {
        whichPage: this.props.whichPage,
        id:null
    };

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
      }

    onSubmit(e) {
		e.preventDefault();
        axios .get(`/api/admin/viewUser/${this.state.id}`)
       .then(res => {  alert("Name: "+res.data.name+"\nEmail:"+res.data.email  );  
	   })
       .catch(error =>{
            this.setState({error})
            alert(error.message+". User not found !");
          });
      }

    render() {
        return (
            <Navbar style={{ backgroundColor: "#FFFFEB" }}>
                <Nav className="mr-auto">
                    <text>..............</text>
                    <img style={{ width: 200, height: 70 }} src={Logo2} />
                </Nav>

                <Form inline onSubmit={this.onSubmit.bind(this)}>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2"  name="id" onChange={this.onChange.bind(this)}/>
                    <Button type="submit" variant="outline-info">Search</Button>
                </Form>
                <Nav.Link href="#home">SignOut</Nav.Link>

                <footer class="page-footer font-small blue" style={{backgroundColor:  '#FFFFEB',color:'#005a73',textAlign:'center'
                ,position:'fixed', bottom: '0', width: '100%', padding: '1rem'}}>
                <div class="footer-copyright text-center py-3">© 2019 Copyright: LIRTENHUB</div>  </footer>

            </Navbar>

        );
    }
}

export default NavbarPage;
