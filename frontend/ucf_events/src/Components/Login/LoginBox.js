import React, { useState } from 'react';
import './loginbox.css';
import ucfLogo from '../../Images/ucf_logo.jpg'
import PropTypes from 'prop-types'

// export class LoginBox extends React.Component {
async function verifyUser(credentials){
    return fetch('http://localhost:3000/login', {
        method: 'POST', 
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    }).then(data => data.json())
}
export default function LoginBox({setToken}) {
    // constructor(props) {
    //     super (props);
    //     this.state = {
    //         userId: '',
    //         userPass: ''
    //     };
    // }

    const [userId, setUserId] = useState();
    const [userPass, setUserPass] = useState();
     

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = await verifyUser({
            userId, userPass
        });
        setToken(token);
        console.log(userId);
        console.log(userPass);
    }

    // render() {
        return (
            <div className="container">
                <div className="row">
                    <h2 style={{textAlign:'center'}}>Welcome! Please Sign In: </h2>
                    <div className="col">
                        <img src={ucfLogo} alt="UCF Logo" className="logo"></img>
                    </div>
                    <div className="col" onSubmit={handleSubmit}>
                        <input 
                            type="userId" 
                            value={userId} 
                            onChange={(e) => setUserId({userId: e.target.value})} 
                            placeholder="Username" 
                        required/>
                        <input 
                            type="password" 
                            value={userPass} 
                            onChange={(e) => setUserPass({userPass: e.target.value})} 
                            placeholder="Password" 
                        required/>
                        <button type="submit">Log In</button>
                    </div>
                </div>
                <button>Create new account!</button>
            </div>
        );
    // }
}
LoginBox.propTypes = {
    setToken: PropTypes.func.isRequired
};
// export default LoginBox;