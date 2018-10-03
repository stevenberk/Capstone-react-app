import React from 'react';
import axios from 'axios';

class buyerSearchPage extends React.Component{
    constructor(props){
        super(props);
        this.state ={ 
            SearchResults : [
            {location: "NULL",
            currency: "NULL",
            amount: 0,
            valueInUSD: 0,
            notes: ""
            }    
            ]
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
<div >
    <h1>
        Browse banknotes
    </h1>
    <select value={this.state.SelectedLocation} onChange={(event)=>{this.setState({SelectedLocation:event.target.value})}} >
       <option value="NULL">Select Location</option>
       <option value="Atlanta">Atlanta</option>
    </select>
  
    <select value={this.state.SelectedCurrency} onChange={(event)=>{this.setState({SelectedCurrency:event.target.value})}} >
        <option value="NULL">Select Currency</option>
        <option value="CAD">Canadian Dollar (CAD)</option>
        <option value="USD">US Dollars (USD)</option>    
    </select>
   <button onClick={(event)=>{console.log(this.state.SearchResults)}}>Search</button>
</div>
    )
}
}

export default buyerSearchPage;