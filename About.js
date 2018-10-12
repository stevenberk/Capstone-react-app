import React from 'react';


class About extends React.Component{
    constructor(props){
        super(props);
        this.state ={

        }
    }
render(){
    return(
        <div>
        <ul>
            <li>
                React
                    <ul>
                        <li>
                            React Router 
                        </li>
                        <li>
                            Axios 
                        </li>
                    </ul>
            </li>
            <li>
                CSS
                    <ul>
                        <li>
                            Bootstrap
                        </li>
                    </ul>
            </li>
          
            <li>
                Node
                <ul>
                        <li>
                            JSON Web Tokens 
                        </li>
                        <li>
                            Body Parser 
                        </li>
                        <li>
                            Express 
                        </li>
                        <li>
                            Bcrypt 
                        </li>
                        <li>
                            PG promise 
                        </li>
                    </ul>
                <li>
                    PostgreSQL
                </li>
            </li>
        </ul>
        <a href="https://github.com/stevenberk/Capstone-react-app">GitHub repo</a>
        </div>
    )
}
}

export default About;