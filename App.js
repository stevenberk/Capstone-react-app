import React from "react";
import buyerSearchPage from './buyerSearchPage';
import sellerPostPage from './sellerPostPage';
import login from './login';

import { BrowserRouter, Route, Link } from "react-router-dom";

const App = () => (
  <BrowserRouter>
    <div>
      <h6>
        <Link to="/logout">Logout</Link>
      </h6>
      <ul>
        <li>
          <Link to="/login">Account</Link>
        </li>
        <li>
          <Link to="/sell">Sell</Link>
        </li>
        <li>
          <Link to="/buy">Buy</Link>
        </li>
      </ul>
      <Route path="/" component={signup} exact/>
      <Route path="/login" component={login} />
      <Route path="/logout" component={logout} />
      <Route path="/buy" component={buyerSearchPage} />
      <Route path="/sell" component={sellerPostPage} />
    </div>
  </BrowserRouter> 
)

class signup extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        Email: "null",
        Password: "null",
        ConfirmPassword: "nothing here"
    }
  }

 render(){
   return(<div>
    <form>
        <input type="text" placeholder="Email" onChange={(event)=>{this.setState({email:event.target.value})}}/>
        <input type="password" placeholder="Password" onChange={(event)=>{this.setState({password:event.target.value})}}/>
        <input type="password" placeholder="Confirm Password" onChange={(event)=>{this.setState({ConfirmPassword:event.target.value})}}/>
    </form>
    <button onClick={(event)=>{
      if (this.state.password === this.state.ConfirmPassword){
        alert("passwords match")
      }else{
        alert("passwords dont match")
      }
    }}>
      Sign up!
    </button>
    </div>)
 } 
}

let logout = () =>{
  let returnContent ;
  if (localStorage.length > 0){
  localStorage.removeItem("email");
  localStorage.removeItem("token");
    returnContent = <h1>Logged Out</h1>
  }else{
    returnContent = <h1>please log in</h1>
  }
  return (
   returnContent
  )
}




export default App;