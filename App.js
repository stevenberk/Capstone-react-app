import React from "react";
import buyerSearchPage from './buyerSearchPage';
import sellerPostPage from './sellerPostPage';
import Login from './login';
import Signup from './signup';
import Loginform from './Loginform';
import { BrowserRouter, Route, Link } from "react-router-dom";



const App = () => (
  <BrowserRouter>
    <div>
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
      <Route path="/" component={Login} exact/>
      <Route path="/login" component={Login} exact />
      <Route path="/buy" component={buyerSearchPage} exact/>
      <Route path="/sell" component={sellerPostPage} exact/>
    </div>
  </BrowserRouter> 
)






export default App;