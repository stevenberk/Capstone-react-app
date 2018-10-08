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
            <p>Value in USD at time of submission: {post.valueinusd}</p>
            <p>Seller Email: {post.selleremail}</p>
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
                    postid: 0,
                    location: "NULL",
                    currency: "NULL",
                    amount: 0,
                    valueinusd: 0,
                    sellername: "null",
                    sellerid: 0,
                    selleremail: "n",
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
                   
                }else{
                
                    }
                })
    }

 
render() 

{
let logout=()=>{
        localStorage.removeItem("email");
        localStorage.removeItem("token");
        localStorage.removeItem("firstname");
        localStorage.removeItem("userid");
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

    <button onClick={(event)=>{
        //this does a PostgreSQL SELECT
        axios.post("http://localhost:3006/querysubmissions", {
            location: this.state.SelectedLocation,
            currency: this.state.SelectedCurrency
        }
    ).then((response)=> this.setState({
        SearchResults: response.data
    }));
    }}
    
    >Search</button>
    
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