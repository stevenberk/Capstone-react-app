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
let ArrayMapperRenderer = (props)=>
<div>    
        <h1>Your submission:</h1>
       <ul>
           {props.submissions.map(post =>
           <li>
               <p>Your Location: {post.location}</p>
               <p>Your Currency for sale:{post.amount} {post.currency}</p> 
               <p>Value in USD at time of submission: {post.valueInUSD}</p>
               <p>Your Email: {post.sellerEmail}</p>
               <p>Notes: {post.notes}</p>
               <button onClick={(event)=>{
                   
               }}>Delete</button>  
           </li> 
           
       )}
       </ul>
       <button onClick={(event)=>{
           localStorage.removeItem("email");
           localStorage.removeItem("token");
           this.setState({loginFlag:false})
       }}>
       Log Out
       </button>
    </div>

let accountInfo = 
<div>
    <ArrayMapperRenderer submissions={this.state.SearchResults.filter(entry =>(
        entry.sellerEmail === localStorage.getItem("email")))}/>
</div>    

        return(accountInfo)
    }
}

export default Youraccount;