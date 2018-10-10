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
                location: "",
                currency: "",
                amount: 0,
                valueinusd: 0,
                selleremail: "",
                sellername: '', 
                sellerid: '1' ,
                // notes: ""
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
        }
    }).then(axios.post('http://localhost:3006/seedaccountpage',
    {
        email:localStorage.getItem("email")
    })
    .then((response)=> this.setState({SearchResults: response.data, loadedContent:true})))
}

render(){
  let ArrayMapperRenderer = (props)=>
    <div >
    <div className="fixheader">
    <h1>Your banknote submissions:</h1>
    </div>
    <div className="flexrow "> 
       {props.submissions.map(post =>
        <div className="Mycard spaceAlittle cardSupplement">
          <h5>{post.amount} {post.currency}</h5> 
          <p>Value in USD: ${post.valueinusd}</p>
          <p>Your Email: {post.selleremail}</p>
          <p>Your Location: {post.location}</p>
          {/* <p>Notes: {post.notes}</p> */}
          <button className="btn btn-secondary btn-sm" onClick={(event)=>{
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
      </div>  
      )}
      <button className=" dontshowdesktop   btn btn-link spaceAlittle logoutbutton" onClick={(event)=>{
       localStorage.removeItem("email");
       localStorage.removeItem("token");
       localStorage.removeItem("firstname");
       localStorage.removeItem("userid");
       this.setState({loadedContent:false})
      }}>
      Log Out
    </button>
    </div>
    <button className="dontshowmobil btn btn-link spaceAlittle logoutbutton" onClick={(event)=>{
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