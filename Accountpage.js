import React from 'react';
import Login from './login';
import axios from 'axios';

class Accountpage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        SearchResults : [
            {
                postid: 0,
                location: "You have no Submissions",
                currency: "",
                amount: 0,
                valueinusd: 0,
                selleremail: "",
                sellername: '',
                sellerid: '1' ,
                notes: ""
            }    
        ],
        email: "null",
        password: "password",
        loginFlag: false,
        loadedContent: false
        
      
    }
}
componentDidMount() {
    
    axios.get('http://localhost:3006/isloggedin', 
        {headers: {"authorization" : `Bearer ${localStorage.getItem("token")}`}
    })
    .then(response => {
        if (response.data === "yes" && this.state.loginFlag === false){
            this.setState({loginFlag : true})
        }else{
          console.log("no dice beans and rice")
        }
    }).then(axios.post('http://localhost:3006/seedaccountpage',
    {
        email:localStorage.getItem("email")
    })
    .then((response)=> this.setState({SearchResults: response.data, loadedContent:true})))
}

render(){
  let ArrayMapperRenderer = (props)=>
  <div>    
    <h1>Your submissions:</h1>
    <ul>
       {props.submissions.map(post =>
        <li>
          <p>Your Location: {post.location}</p>
          <p>Your Currency for sale: {post.amount} {post.currency}</p> 
          <p>Value in USD at time of submission: {post.valueinusd}</p>
          <p>Your Email: {post.selleremail}</p>
          <p>Notes: {post.notes}</p>
          <button onClick={(event)=>{
             axios.post('http://localhost:3006/deletepost',  
               {id:post.postid}
              )
               .then(()=>{
                 axios.post('http://localhost:3006/seedaccountpage',
               {
                 email:localStorage.getItem("email")
                }
              ).then((response)=> this.setState({SearchResults:response.data}))})
          }}>Delete</button>  
      </li>  
      )}
    </ul>
    <button onClick={(event)=>{
       localStorage.removeItem("email");
       localStorage.removeItem("token");
       localStorage.removeItem("firstname");
       localStorage.removeItem("userid");
       this.setState({loadedContent:false})
      }}>
      Log Out
    </button>
  </div>
  

let UserAccountPage =
<div>
    <ArrayMapperRenderer submissions={this.state.SearchResults}/>
</div>   


let BackToLogin =
<div>
  <Login />
</div>


return (this.state.loadedContent ? UserAccountPage : BackToLogin )
}

}

export default Accountpage;