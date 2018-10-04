import React from 'react';
import axios from 'axios';

class login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: "null",
            password: "password"
        }
    }

render(){
    return(
    <div>
        <form>
            <input type="text" placeholder="Email" onChange={(event)=>{this.setState({email:event.target.value})}}/>
            <input type="password" placeholder="Password" onChange={(event)=>{this.setState({password:event.target.value})}}/>
        </form>
        <button onClick={(event)=>{
            axios.post('http://localhost:3006/api/login', {
                email: this.state.email,
                password: this.state.password
            }).then((response)=> {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("email", this.state.email);
            })
            .catch((event)=> {
                alert('Invalid Login')
            })  
            }   
        }>
        Login</button>
    
    </div>
    )
}
}


export default login;