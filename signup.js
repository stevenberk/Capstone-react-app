import React from 'react';
import axios from 'axios';

import Youraccount from "./Youraccount";



class Signup extends React.Component{
    constructor(props){
      super(props);
      this.state = {
          email: "null",
          password: "null",
          ConfirmPassword: "nothing here",
          firstname: "",
          lastname: "lastname",
          loginFlag: false
      }
    }
  
   render(){
     
let SignupForms =        
<div>
    <form>
        <label>Create an Account!</label>
        <input type="text" placeholder="First Name" onChange={(event)=>{this.setState({firstname:event.target.value})}}/>
        <input type="text" placeholder="Email" onChange={(event)=>{this.setState({email:event.target.value})}}/>
        <input type="password" placeholder="Password" onChange={(event)=>{this.setState({password:event.target.value})}}/>
        <input type="password" placeholder="Confirm Password" onChange={(event)=>{this.setState({ConfirmPassword:event.target.value})}}/>
    </form>
    <button onClick={(event)=>{
        if (this.state.password === this.state.ConfirmPassword && this.state.email !== "null"){

            axios.post('http://localhost:3006/addnewuser',
            {
               email: this.state.email,
               password: this.state.password,
               firstname: this.state.firstname,
               lastname: this.state.lastname
            }
            ).then(
                axios.post('http://localhost:3006/api/login', {
                email: this.state.email,
                password: this.state.password
            }).then((response)=> {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("email", this.state.email);
                this.setState({loginFlag : true});
               
            }).then(this.setState({loginFlag:true})))
        }else{
            alert("invalid signup credentials")
        }
    }}>
        Sign up!
    </button>
</div>
let GoToAccountPage =
<div>
    <Youraccount />
</div>

let RenderToPage;

this.state.loginFlag ? RenderToPage = GoToAccountPage : RenderToPage = SignupForms


return(RenderToPage)
   } 
}

export default Signup 