import React from "react";
import buyerSearchPage from './buyerSearchPage';
import SellerPostPage from './sellerPostPage';
import Login from './login';
import { BrowserRouter, Route, Link } from "react-router-dom";
import About from './About';


const App = () => (
  <BrowserRouter>
    <div className="mainpagecontainer">
      <div className="navbar">
        <div className="nav-item">
          <Link className="darkcyan" to="/about">About</Link>
        </div>
        <div className="nav-item">
          <Link className="darkcyan" to="/login">Account</Link>
        </div>
        <div className="nav-item">
          <Link className="darkcyan" to="/sell">Sell</Link>
        </div>
        <div className="nav-item">
          <Link className="darkcyan" to="/buy">Buy</Link>
        </div>
      </div>
      <Route path="/" component={Login} exact/>
      <Route path="/about" component={About} /> 
      <Route path="/login" component={Login}  />
      <Route path="/buy" component={buyerSearchPage} />
      <Route path="/sell" component={SellerPostPage} />
    </div>
  </BrowserRouter> 
)






export default App;