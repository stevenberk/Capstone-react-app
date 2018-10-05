import React from 'react';
import axios from 'axios';



class Signup extends React.Component{
    constructor(props){
      super(props);
      this.state = {
          email: "null",
          password: "null",
          ConfirmPassword: "nothing here"
      }
    }
  
   render(){
     return(
<div>
    <form>
        <label>Create an Account!</label>
        <input type="text" placeholder="Email" onChange={(event)=>{this.setState({email:event.target.value})}}/>
        <input type="password" placeholder="Password" onChange={(event)=>{this.setState({password:event.target.value})}}/>
        <input type="password" placeholder="Confirm Password" onChange={(event)=>{this.setState({ConfirmPassword:event.target.value})}}/>
    </form>
    <button onClick={(event)=>{
        if (this.state.password === this.state.ConfirmPassword && this.state.email !== "null"){
            alert("passwords match")
        }else{
            alert("passwords dont match or email is invalid")
        }
    }}>
        Sign up!
    </button>
</div>)
   } 
}

export default Signup 