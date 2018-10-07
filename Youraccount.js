import React from 'react';
import axios from 'axios';



class Youraccount extends React.Component{
    constructor(props){
        super(props);
     this.state ={
        SearchResults : [
            {
                location: "NULL",
                currency: "NULL",
                amount: 0,
                valueInUSD: 0,
                sellerEmail: "",
                notes: ""
            },
              
        ],
        loginFlag: true 
    }
    axios.get('http://localhost:3006/posts')
        .then(response => {
            this.setState({
            SearchResults : response["data"]
            })
        })
    }

    render(){

        return(
            <div>
            <h1>Welcome, thanks for signing up!</h1>
            </div>
        )
    }
}

export default Youraccount;