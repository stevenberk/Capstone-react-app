import React from 'react';
import axios from 'axios';
import Signup from "./signup"
 



class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            SearchResults : [
                {
                    postid: 0,
                    location: "",
                    currency: "",
                    amount: 0,
                    valueInUSD: 0,
                    sellerEmail: "",
                    sellername: '',
                    sellerid: '1' ,
                    notes: ""
                }    
            ],
            email: "null",
            password: "password",
            loginFlag: false,
            signupFlag: false
        }
        
        axios.post('http://localhost:3006/seedaccountpage',
            {email:localStorage.getItem("email")}
            ).then((response)=> this.setState({SearchResults: response.data}))
        
        axios.get('http://localhost:3006/isloggedin', {headers: {"authorization" : `Bearer ${localStorage.getItem("token")}`}})
        .then(response => {
            if (response.data === "yes" && this.state.loginFlag === false){
                this.setState({loginFlag : true})
            }else{
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
               <button onClick={(event)=>{
                   
               }}>Delete</button>  
           </li> 
           
       )}
       </ul>
       <button onClick={(event)=>{
           localStorage.removeItem("email");
           localStorage.removeItem("token");
           localStorage.removeItem("firstname");
           localStorage.removeItem("userid");
           this.setState({loginFlag:false})
       }}>
       Log Out
       </button>
    </div>  


let loginForms = 
<div>
    <form>
        <label>Please Log In</label>
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
            localStorage.setItem("firstname", response.data.firstname);
            localStorage.setItem("userid", response.data.userid)
            this.setState({loginFlag : true});
           
        })
        .catch((event)=> {
            alert('Invalid Login')
        })  
        }   
    }>
        Login
    </button>
    <button onClick={(click)=>{
        this.setState({signupFlag:true})
    }}>
        signup
    </button>
</div>

let signuppage =
<div>
    <Signup />
</div>

let accountInfo = 
<div>
<ArrayMapperRenderer submissions={this.state.SearchResults}/>
</div>    

let turnaryLoginPageOutpage;
this.state.loginFlag ? turnaryLoginPageOutpage = accountInfo : this.state.signupFlag ? turnaryLoginPageOutpage = signuppage : turnaryLoginPageOutpage = loginForms 






return(turnaryLoginPageOutpage)
}
}


export default Login;