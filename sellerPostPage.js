import React from 'react';
import axios from 'axios';
import Login from './login';


class sellerPostPage extends React.Component{
    constructor(props){
        super(props);
        this.state = { 
            ExchangeRates : [
            {"success":true,"timestamp":1538489645,"base":"EUR","date":"2018-10-02","rates":
            {"AED":4.239303,"AFN":87.307795,"ALL":125.889152,"AMD":557.96166,"ANG":2.047258,"AOA":342.044518,"ARS":44.421541,"AUD":1.605697,"AWG":2.077729,"AZN":1.967712,"BAM":1.958567,"BBD":2.308549,"BDT":97.127975,"BGN":1.955973,"BHD":0.435154,"BIF":2060.070977,"BMD":1.154101,"BND":1.627749,"BOB":7.96982,"BRL":4.568684,"BSD":1.153432,"BTC":0.000176,"BTN":84.438782,"BWP":12.242689,"BYN":2.457255,"BYR":22620.387201,"BZD":2.31824, "CAD" :1.480435,"CDF":1876.568805,"CHF":1.135699,"CLF":0.026079,"CLP":759.050174,"CNY":7.927406,"COP":3458.380219,"CRC":671.49657,"CUC":1.154101,"CUP":30.583687,"CVE":110.373061,"CZK":25.790681,"DJF":205.106569,"DKK":7.456194,"DOP":57.630078,"DZD":136.714494,"EGP":20.673435,"ERN":17.311109,"ETB":32.205273,"EUR":1,"FJD":2.465113,"FKP":0.888669,"GBP":0.889356,"GEL":3.012297,"GGP":0.889385,"GHS":5.519373,"GIP":0.888646,"GMD":57.006822,"GNF":10508.093516,"GTQ":8.880984,"GYD":240.456608,"HKD":9.04048,"HNL":27.841954,"HRK":7.432761,"HTG":80.515305,"HUF":323.553495,"IDR":17364.090135,"ILS":4.217236,"IMP":0.889385,"INR":84.64755,"IQD":1373.380651,"IRR":48593.439235,"ISK":129.70936,"JEP":0.889385,"JMD":154.643824,"JOD":0.818836,"JPY":131.256163,"KES":116.460355,"KGS":79.412451,"KHR":4717.357408,"KMF":491.272069,"KPW":1038.708414,"KRW":1291.207006,"KWD":0.350381,"KYD":0.961009,"KZT":419.148151,"LAK":9827.173718,"LBP":1742.635428,"LKR":195.412878,"LRD":179.576837,"LSL":16.393989,"LTL":3.407762,"LVL":0.698104,"LYD":1.598432,"MAD":10.921605,"MDL":19.497413,"MGA":3944.139033,"MKD":61.583342,"MMK":1776.279517,"MNT":2943.165812,"MOP":9.308116,"MRO":411.438254,"MUR":39.82179,"MVR":17.784849,"MWK":839.325993,"MXN":21.660567,"MYR":4.771083,"MZN":69.915375,"NAD":16.394041,"NGN":420.404391,"NIO":37.163773,"NOK":9.444981,"NPR":134.585535,"NZD":1.750137,"OMR":0.444318,"PAB":1.15342,"PEN":3.81846,"PGK":3.860587,"PHP":62.676949,"PKR":142.243135,"PLN":4.295923,"PYG":6798.231297,"QAR":4.202197,"RON":4.668113,"RSD":118.444894,"RUB":75.508216,"RWF":1001.182954,"SAR":4.328576,"SBD":9.190687,"SCR":15.700967,"SDG":20.76055,"SEK":10.39678,"SGD":1.585435,"SHP":1.52445,"SLL":9694.452205,"SOS":667.643358,"SRD":8.607259,"STD":24469.389724,"SVC":10.092213,"SYP":594.362137,"SZL":16.405553,"THB":37.334048,"TJS":10.870308,"TMT":4.050896,"TND":3.241065,"TOP":2.630545,"TRY":6.926212,"TTD":7.773738,"TWD":35.393404,"TZS":2640.817473,"UAH":32.612021,"UGX":4408.84052,"USD":1.154101,"UYU":38.108922,"UZS":9336.680205,"VEF":286817.219403,"VND":26900.833838,"VUV":130.988538,"WST":3.015564,"XAF":656.891648,"XAG":0.077464,"XAU":0.000957,"XCD":3.119017,"XDR":0.828929,"XOF":661.300025,"XPF":119.536024,"YER":288.930141,"ZAR":16.571753,"ZMK":10388.29913,"ZMW":13.869415,"ZWL":372.030366}}
            ],
            SelectedLocation: "NULL",
            SelectedCurrency: "NULL",
            Amount: 0,
            Notes: "",
            SubmittedPosts: [],
            SellerEmail: localStorage.getItem("email"),
            sellername: localStorage.getItem("firstname"),
            sellerid: localStorage.getItem("userid"),
            PostAgainButtonStatus: true,
            loginFlag: false
        }
 
        let getExchangeRates = () =>{
            return fetch('')
            .then(res => res.json())
            .then(rates => {
                this.setState({
                    ExchangeRates : rates
                    })
                }
            )
        }
        

        axios.get('http://localhost:3006/isloggedin', {headers: {"authorization" : `Bearer ${localStorage.getItem("token")}`}})
        .then(response => {
            if (response.data === "yes" && this.state.loginFlag === false){
                this.setState({loginFlag : true})
                getExchangeRates();
                ;
            }else{
                // console.log(response.data)
            }
        })
        // .catch(console.log("user is not logged in"))

    }

    render()  {

let logout=()=>{
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    this.setState({loginFlag: false})
}
  
let submitForms = <div>
    <h1> 
        Post banknotes to sell
    </h1>
    <select value={this.state.SelectedLocation} onChange={(event)=>{this.setState({SelectedLocation:event.target.value})}} >
        <option value="NULL">Select Location</option>
        <option value="Atlanta">Atlanta</option>
        <option value="Boston">Boston</option>
        <option value="Los Angeles">Los Angeles</option>  
    </select>
    <select value={this.state.SelectedCurrency} onChange={(event)=>{this.setState({SelectedCurrency:event.target.value})}} >
        <option value="NULL">Select Currency</option>
        <option value="CAD">Canadian Dollars (CAD)</option>
        <option value="USD">US Dollars (USD)</option>
        <option value="GBP">GB Pounds (GBP)</option>    
    </select>
      
    <form value={this.state.Amount} onChange={(event)=>{this.setState({Amount:event.target.value})}}>
        <input type="number" min="0" placeholder="Enter Amount" />
    </form>     

    <form value={this.state.Notes} onChange={(event)=>{this.setState({Notes:event.target.value})}}>
        <input type="text"  placeholder="Notes" />
    </form> 

    <button onClick={(event)=>{
        let submissionContentArray = [
            this.state.SelectedLocation, 
            this.state.SelectedCurrency, 
            parseFloat(this.state.Amount), 
            parseFloat(((this.state.Amount * (this.state.ExchangeRates["rates"][this.state.SelectedCurrency])).toFixed(2))), 
            this.state.SellerEmail,
            this.state.Notes,
            this.state.sellername,
            this.state.sellerid]; 
            this.setState({SubmittedPosts:this.state.SubmittedPosts.concat([submissionContentArray])}); 
          
        axios.post('http://localhost:3006/submissions',
            {
            postid: 3,
            amount: submissionContentArray[2],
            currency: submissionContentArray[1],
            location: submissionContentArray[0],
            notes: submissionContentArray[5],
            sellerEmail: submissionContentArray[4],
            valueInUSD: submissionContentArray[3],
            sellername: submissionContentArray[6],
            sellerid: submissionContentArray[7]
            },
            {headers: {"authorization" : `Bearer ${localStorage.getItem("token")}`}} )
            .then(()=>this.setState({PostAgainButtonStatus:false}))
            .catch((event)=> {
                alert('Invalid Login')
            }) 
        
        }}
        >
        Submit
    </button> 
<button onClick={(event)=>{logout()}}>
    logout
</button>
</div>
let alreadySubmitted = <div>
<h1>
    Submitted!
</h1>
<button onClick={(event)=>{this.setState({PostAgainButtonStatus:true})}}>
    Submit Again
</button>
<button onClick={(event)=>{logout()}}>
    logout
</button>
</div>

let pleaseLogOn =
<div>
    <Login />
    
</div>
let turnaryOutput;
!this.state.loginFlag ? turnaryOutput = pleaseLogOn :
 this.state.PostAgainButtonStatus ? turnaryOutput = submitForms : turnaryOutput = alreadySubmitted

return(turnaryOutput)

}
};
    
export default sellerPostPage;
