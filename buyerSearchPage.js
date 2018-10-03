import React from 'react';

class buyerSearchPage extends React.Component{
    constructor(props){
        super(props);
        this.state ={ 
            SearchResults : [],
            SelectedLocation: "NULL",
            SelectedCurrency: "NULL"
        }
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
   <button onClick={(event)=>{console.log(this.state.SelectedCurrency, this.state.SelectedLocation)}}>Search</button>
</div>
    )
}
}

export default buyerSearchPage;