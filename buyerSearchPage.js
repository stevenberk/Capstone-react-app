import React from 'react';
import axios from 'axios';

let ArrayMapperRenderer = (props)=>
 <div>    
    <ul>
        {props.submissions.map(post =>
        <li>
            <p>{post.location}</p>
            <p>{post.amount} {post.currency}</p> 
            <p>Value in USD at time of submission: {post.valueInUSD}</p>
            <p>Seller Email: {post.sellerEmail}</p>
            <p>Notes: {post.notes}</p>  
        </li> 
    )}
    </ul>
</div>  

class buyerSearchPage extends React.Component{
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
            SelectedLocation: "NULL",
            SelectedCurrency: "NULL",
            isLoggedin: true
    }
    axios.get('http://localhost:3006/submissions', {headers: {"authorization" : `Bearer ${localStorage.getItem("token")}`}})
        .then(response => {
            this.setState({
            SearchResults : response["data"]
            })
        })  
        .catch((event)=> {
            this.setState({
               isLoggedin:false
                })
        }) ;

    }

render() {

let displayIfLoggedIn = <div>
    <h1>
        Browse banknotes 
    </h1>
    <select value={this.state.SelectedLocation} onChange={(event)=>{this.setState({SelectedLocation:event.target.value})}} >
       <option value="NULL">Select Location</option>
       <option value="Atlanta">Atlanta</option>
       <option value="Boston">Boston</option>
       <option value="Los Angeles">Los Angeles</option>
    </select>
  
    <select value={this.state.SelectedCurrency} onChange={(event)=>{this.setState({SelectedCurrency:event.target.value})}} >
        <option value="NULL">Select Currency</option>
        <option value="CAD">Canadian Dollar (CAD)</option>
        <option value="USD">US Dollars (USD)</option>
        <option value="GBP">GB Pounds (GBP)</option>     
    </select>
    
  <ArrayMapperRenderer submissions={this.state.SearchResults.filter(entry =>(
      entry.location === this.state.SelectedLocation &&
      entry.currency === this.state.SelectedCurrency))}/>
</div>

let pleaseLogIn = 
<div>
    <h1>Please Log In</h1>
</div>

let turnaryOutputDisplay;
this.state.isLoggedin ? turnaryOutputDisplay = displayIfLoggedIn : turnaryOutputDisplay = pleaseLogIn
return (turnaryOutputDisplay)   
}
}

export default buyerSearchPage;