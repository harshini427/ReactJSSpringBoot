import React, { useState } from "react";
import { unameValidator, passwordValidator } from './regexValidator';
import { useHistory } from 'react-router-dom';
import "./LoginForm.css";

const LoginForm = () => {
    const history = useHistory();
    const [data,setData] = useState({
        username : '',
        password : ''
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const { username, password } = data;

    const handleChange = e => {
        e.preventDefault();
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const formSubmitter = e => {
        e.preventDefault();
        setSuccessMessage('');
        if (!unameValidator(data.username)) {
            return setErrorMessage('Please enter a valid user ID');
        }

        if (!passwordValidator(data.password)) {
            return setErrorMessage('Password should have a minimum of 8 characters with a combination of uppercase, lowercase, numbers, and special characters');
        }

        if (data.username !== 'Harshi$27' || data.password !== 'Qwert@12345') {
            return setErrorMessage('Invalid username or password');
        }

        setErrorMessage('');
        history.push('/employees');
    };

    return (
        <div className="container">
            <div className='btn-group btn-group-lg d-flex' role="group" aria-label="...">
                <button type="button" onClick={() => history.push('/')}>Login</button>
                <button type="button" onClick={() => history.push('/employees')}>Employees</button>
                <button type="button" onClick={() => history.push('/add-employee/_add')}>Add</button>
            </div>
            <div className="Container">
                <form className="login" onSubmit={formSubmitter}>
                    <h1>Login</h1>
                    {errorMessage && <div style={{ marginBottom: '10px', color: 'red' }}>{errorMessage}</div>}
                    {successMessage && <div style={{ marginBottom: '10px', color: 'green' }}>{successMessage}</div>}
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" placeholder="Username" id="username" value={username} onChange={handleChange} />
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" placeholder="Password" id="password" value={password} onChange={handleChange} />
                    <button className="text-decoration-none btn btn-sm btn-dark" type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
