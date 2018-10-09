import React from 'react';
import axios from 'axios';

import Login from './login';

let ArrayMapperRenderer = (props)=>
<div>    
    <div className="flexrow ">
        {props.submissions.map(post =>
        <div className="card spaceAlittle">
            <h5>{post.amount} {post.currency}</h5> 
            <p>Value in USD: ${post.valueinusd}</p>
            <p>Seller Email: {post.selleremail}</p>
            <p>{post.location}</p>
            {/* <p>Notes: {post.notes}</p>   */}
        </div> 
    )}
    </div>
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
            SelectedLocation: "null",
            SelectedCurrency: "null",
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
let displayIfLoggedIn = <div >
    
    <h1>
        Browse banknotes 
    </h1>
    <select value={this.state.SelectedLocation} onChange={(event)=>{this.setState({SelectedLocation:event.target.value})}} >
       <option value="SelectNULL">Select Location</option>
       <option value="Atlanta">Atlanta</option>
       <option value="Boston">Boston</option>
       <option value="Chicago">Chicago</option>
       <option value="Dallas">Dallas</option>
       <option value="Bay Area">Bay Area</option>
       <option value="New York">New York</option>
       <option value="Seattle">Seattle</option>
       <option value="Los Angeles">Los Angeles</option>
       <option value="Miami">Miami</option> 
    </select>
    <select value={this.state.SelectedCurrency} onChange={(event)=>{this.setState({SelectedCurrency:event.target.value})}} >
        <option value="SelectNULL">Select Currency</option>
        <option value="CAD">Canadian Dollar (CAD)</option>
        <option value="EUR">Euros (EUR)</option>
        <option value="GBP">GB Pounds (GBP)</option>
        <option value="JPY">Japanese Yen (JPY)</option>
        <option value="MXN">Mexican Peso (MXN)</option>
        <option value="CUC">Cuban Convertible Peso (CUC)</option>
        <option value="AUD">Australian Dollar (AUD)</option>
        <option value="THB">Thai Baht (THB)</option>
        <option value="CHF">Swiss Franc (CHF)</option>     
    </select>

    <button className="btn btn-primary" onClick={(event)=>{
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

    <button className="btn btn-link" onClick={(event)=>{logout()}}>
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