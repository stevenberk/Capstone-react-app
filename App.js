import React from "react";
import buyerSearchPage from './buyerSearchPage';
import sellerPostPage from './sellerPostPage';
import Login from './login';
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
      <Route path="/login" component={Login}  />
      <Route path="/buy" component={buyerSearchPage} />
      <Route path="/sell" component={sellerPostPage} />
    </div>
  </BrowserRouter> 
)






export default App;