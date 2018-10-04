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
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/sell">Sell</Link>
        </li>
        <li>
          <Link to="/buy">Buy</Link>
        </li>
      </ul>
      <Route path="/" component={login} exact/>
      <Route path="/login" component={login} />
      <Route path="/logout" component={logout} />
      <Route path="/buy" component={buyerSearchPage} />
      <Route path="/sell" component={sellerPostPage} />
    </div>
  </BrowserRouter> 
)

let logout = () =>{
  localStorage.removeItem("email");
  localStorage.removeItem("token");
  return (
    <h1>Logged out!</h1>
  )
}




export default App;