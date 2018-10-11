import React from 'react';
import axios from 'axios';

import Youraccount from "./Youraccount";



class Signup extends React.Component{
    constructor(props){
      super(props);
      this.state = {
          email: 'null',
          password: 'null',
          ConfirmPassword: 'nothing here',
          firstname: '',
          lastname: '',
          loginFlag: false
      }
    }
  
   render(){
     
let SignupForms =        
<div>
    <div className="formContainer ">
    <form className="signupforms standardizedwidth">
        <label>Create an Account!</label>
        <input className="spaceAlittle standardizedwidth" type="text"  placeholder="First Name" onChange={(event)=>{this.setState({firstname:event.target.value})}}/>
        <input className="spaceAlittle standardizedwidth" type="text"  placeholder="Last Name" onChange={(event)=>{this.setState({lastname:event.target.value})}}/>
        <input className="spaceAlittle standardizedwidth" type="text" placeholder="Email" onChange={(event)=>{this.setState({email:event.target.value})}}/>
        <input className="spaceAlittle standardizedwidth" type="password" placeholder="Password" onChange={(event)=>{this.setState({password:event.target.value})}}/>
        <input className="spaceAlittle standardizedwidth" type="password" placeholder="Confirm Password" onChange={(event)=>{this.setState({ConfirmPassword:event.target.value})}}/>
    </form>
    
    <button className="btn btn-primary standardizedwidth" onClick={(event)=>{
        if (this.state.password === this.state.ConfirmPassword && this.state.email !== "null"){
            //this does a PostgreSQL INSTERT
            axios.post('http://localhost:3006/createuser', {
                email: this.state.email,
                password: this.state.password,
                firstname: this.state.firstname,
                lastname: this.state.lastname
            }).then(this.setState({loginFlag:true}))
        }else{
            alert("invalid signup credentials")
        }
    }}>
        Sign up!
    </button>
    </div>
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