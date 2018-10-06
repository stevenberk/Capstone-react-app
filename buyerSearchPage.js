import React from 'react';
import axios from 'axios';

import Login from './login';

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
                    sellerEmail: "n",
                    notes: "n"
                }    
            ],
            SelectedLocation: "n",
            SelectedCurrency: "n",
            loginFlag: false
    }
    axios.get('http://localhost:3006/isloggedin', {headers: {"authorization" : `Bearer ${localStorage.getItem("token")}`}})
        .then(response => {
            if (response.data === "yes" && this.state.loginFlag === false){
                this.setState({loginFlag : true});
                    axios.get('http://localhost:3006/submissions', {headers: {"authorization" : `Bearer ${localStorage.getItem("token")}`}})
                    .then(response => {
                    this.setState({
                        SearchResults : response["data"]
                        })
                    }) 
                }else{
                // console.log(response.data)
                    }
                })
                // .catch(console.log("user is not logged in"))
     
        

    }

 
render() 

{
let logout=()=>{
        localStorage.removeItem("email");
        localStorage.removeItem("token");
        this.setState({loginFlag: false})
}
let displayIfLoggedIn = <div>
    
    <h1>
        Browse banknotes 
    </h1>
    <select value={this.state.SelectedLocation} onChange={(event)=>{this.setState({SelectedLocation:event.target.value})}} >
       <option value="SelectNULL">Select Location</option>
       <option value="Atlanta">Atlanta</option>
       <option value="Boston">Boston</option>
       <option value="Los Angeles">Los Angeles</option>
    </select>
  
    <select value={this.state.SelectedCurrency} onChange={(event)=>{this.setState({SelectedCurrency:event.target.value})}} >
        <option value="SelectNULL">Select Currency</option>
        <option value="CAD">Canadian Dollar (CAD)</option>
        <option value="USD">US Dollars (USD)</option>
        <option value="GBP">GB Pounds (GBP)</option>     
    </select>
    
  <ArrayMapperRenderer submissions={this.state.SearchResults.filter(entry =>(
      entry.location === this.state.SelectedLocation &&
      entry.currency === this.state.SelectedCurrency))
      }/>

    <button onClick={(event)=>{logout()}}>
        logout
    </button>
</div>

let pleaseLogIn = 
<div>

    <Login />
    
</div>

let turnaryOutputDisplay;
!this.state.loginFlag ? turnaryOutputDisplay = pleaseLogIn : turnaryOutputDisplay = displayIfLoggedIn 
return (turnaryOutputDisplay)   
}
}

export default buyerSearchPage;