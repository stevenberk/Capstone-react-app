import React from "react";
import buyerSearchPage from './buyerSearchPage';
import sellerPostPage from './sellerPostPage';
import { BrowserRouter, Route, Link } from "react-router-dom";

const App = () => (
  <BrowserRouter>
    <div>
      <ul> 
        <li>
          <Link to="/sell">Sell</Link>
        </li>
        <li>
          <Link to="/buy">Buy</Link>
        </li>
      </ul>
      <Route path="/" component={firstRoute} exact />
      <Route path="/buy" component={buyerSearchPage} />
      <Route path="/sell" component={sellerPostPage} />
    </div>
  </BrowserRouter> 
)



const firstRoute = () => {
  return (
    <h1>homepage</h1>
  ) 
}




export default App;