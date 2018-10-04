import React from 'react';
import axios from 'axios';

let ArrayMapperRenderer = (props)=> <div>    
    <ul>
        {props.submissions.map(post =>
        <li>
            <p>{post.currency}</p> 
            <p>{post.location}</p>
            <p>Amount: {post.amount}</p> 
            <p>Value in USD at time of submission: {post.valueInUSD}</p>  
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
                    notes: ""
                }    
            ],
            SelectedLocation: "NULL",
            SelectedCurrency: "NULL"
    }
    axios.get('http://localhost:3006/submissions')
        .then(response => {
            this.setState({
            SearchResults : response["data"]
            })
        })  
        .catch(function (error) {
            console.log(error);
         });
    }
    

render() {
return (
<div>
    <h1>
        Browse banknotes, 
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
      entry.currency === this.state.SelectedCurrency)
  )}/>
</div>)
   
}
}

export default buyerSearchPage;