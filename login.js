import React from 'react';
import axios from 'axios';
import Signup from "./signup"
import Accountpage from "./Accountpage";
 
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
                    valueinusd: 0,
                    selleremail: "",
                    sellername: '',
                    sellerid: '1' ,
                    // notes: ""
                }    
            ],
            email: "null",
            password: "password",
            loginFlag: false,
            signupFlag: false,
          
        }
    }
componentDidMount() {
     axios.post('http://localhost:3006/seedaccountpage',
        {
            email:localStorage.getItem("email")
        }
    ).then((response)=> this.setState({SearchResults: response.data}))
        
        axios.get('http://localhost:3006/isloggedin', 
            {headers: {"authorization" : `Bearer ${localStorage.getItem("token")}`}
        })
        .then(response => {
            if (response.data === "yes" && this.state.loginFlag === false){
                this.setState({loginFlag : true})
            }
        })

    }
    
    

render(){
let loginForms = 
<div>
    <div className="loginformContainer">
        <form className="signupforms logoutbutton">
            <label>Please Log In</label>
            <input className="spaceAlittle " type="text" placeholder="Email" onChange={(event)=>{this.setState({email:event.target.value})}}/>
            <input  className="spaceAlittle " type="password" placeholder="Password" onChange={(event)=>{this.setState({password:event.target.value})}}/>
        </form>
    
    
    <button className="btn btn-primary spaceAlittle logoutbutton" onClick={(event)=>{


        axios.post('http://localhost:3006/querylogin', {
            email: this.state.email,
            password: this.state.password
        }).then((response)=> {console.log(response.data);
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
    <button className="btn btn-primary spaceAlittle logoutbutton" onClick={(click)=>{
        this.setState({signupFlag:true})
    }}>
        signup
    </button>
    <div >
    </div>
    </div>
</div>

let signuppage =
<div>
    <Signup />
</div>

let accountInfo = 
<div>
    <Accountpage />
   
</div>    


return(this.state.loginFlag  ?  
    accountInfo
   : this.state.signupFlag ? signuppage 
   : loginForms  
   )
}
}

export default Login;