import React from "react";
import buyerSearchPage from './buyerSearchPage';
import SellerPostPage from './sellerPostPage';
import Login from './login';
import { BrowserRouter, Route, Link } from "react-router-dom";



const App = () => (
  <BrowserRouter>
    <div>
      <div  >
        <div>
          <Link to="/login">Account</Link>
        </div>
        <div>
          <Link to="/sell">Sell</Link>
        </div>
        <div>
          <Link to="/buy">Buy</Link>
        </div>
      </div>
      <Route path="/" component={Login} exact/>
      <Route path="/login" component={Login}  />
      <Route path="/buy" component={buyerSearchPage} />
      <Route path="/sell" component={SellerPostPage} />
    </div>
  </BrowserRouter> 
)






export default App;