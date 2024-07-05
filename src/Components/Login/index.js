import './index.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login(){

    const navigate = useNavigate();

    const [userName, setUserName] = useState();
    const changeUserName = (e) => {
        setUserName(e.target.value);
    }

    const [pass, setPass] = useState();
    const changePass = (e) => {
        setPass(e.target.value);
    }

    const handleSubmit = (event) => {

        event.preventDefault();
    
        fetch('/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: userName,
                password: pass,
            }),
            })
            .then((response) => response.json())
            .then((data) => {
                console.log('Data sent successfully:', data);
                if (data != null) {
                    navigate('/Dashboard', {state: {uname: userName}})
                    window.sessionStorage.setItem("token", data.token);
                    console.log("token:: ", data.token);
                }
            })
            .catch((error) => {
                console.error('Error logging in:', error);
                alert("Invalid Username or Password")
            });
    };

    return(
        <section>
            <div className="formBox"> 
                <div className="formVal">
                    <form action="">
                        <h2>Login</h2>

                        <div className="inputBox">
                            <input type="text" onChange={changeUserName} required/>
                            <label>Username</label>
                        </div>
                        
                        <div className="inputBox">
                            <input type="password" onChange={changePass} required/>
                            <label>Password</label>
                        </div>
                        
                        <button type='button' onClick={handleSubmit}>
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Login;