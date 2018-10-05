import React from 'react';
import axios from 'axios';




class login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            SearchResults : [
                {
                    location: "NULL",
                    currency: "NULL",
                    amount: 0,
                    valueInUSD: 0,
                    sellerEmail: "",
                    notes: ""
                }    
            ],
            email: "null",
            password: "password",
            loginFlag: false
        }
        axios.get('http://localhost:3006/posts')
        .then(response => {
            this.setState({
            SearchResults : response["data"]
            })
        })
        axios.get('http://localhost:3006/isloggedin', {headers: {"authorization" : `Bearer ${localStorage.getItem("token")}`}})
        .then(response => {
            if (response.data === "yes" && this.state.loginFlag === false){
                this.setState({loginFlag : true});
            }else{
                console.log(response.data)
            }
        })
     
    }
render(){
    let ArrayMapperRenderer = (props)=>
    <div>    
        <h1>Your submission:</h1>
       <ul>
           {props.submissions.map(post =>
           <li>
               <p>Your Location: {post.location}</p>
               <p>Your Currency for sale:{post.amount} {post.currency}</p> 
               <p>Value in USD at time of submission: {post.valueInUSD}</p>
               <p>Your Email: {post.sellerEmail}</p>
               <p>Notes: {post.notes}</p>  
           </li> 
           
       )}
       </ul>
       <button onClick={(event)=>{
           localStorage.removeItem("email");
           localStorage.removeItem("token");
           this.setState({loginFlag:false})
       }}>Log Out</button>
   </div>  


let loginForms = 
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
            this.setState({loginFlag : true});
           
        })
        .catch((event)=> {
            alert('Invalid Login')
        })  
        }   
    }>
        Login
    </button>
</div>

let accountInfo = 
<div>
<ArrayMapperRenderer submissions={this.state.SearchResults.filter(entry =>(
    entry.sellerEmail === localStorage.getItem("email")))}/>
</div>    

let turnaryLoginPageOutpage;
this.state.loginFlag ? turnaryLoginPageOutpage = accountInfo : turnaryLoginPageOutpage = loginForms

return(turnaryLoginPageOutpage)
}
}


export default login;