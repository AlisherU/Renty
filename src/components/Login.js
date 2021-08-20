import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Context } from "../Store";
import { storeToken } from "../helper.js"

function Login() {

    // const [user, setUser] = useState({
    //     email: '', password: ''
    // })

    const [state, dispatch] = useContext(Context)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    // const onChangeInput = e => {
    //     const { name, value } = e.target;
    //     setUser({ ...user, [name]: value })
    // }

    const loginSubmit = async e => {
        e.preventDefault()
        try {
            const response = await axios.post('/auth/login', {
                email,
                password
            })
            await console.log(response)
            localStorage.setItem('jwt', response.data.token)
            storeToken(dispatch)

            window.location.href = "/items";
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    return (
        <div className="login-page">
            <form onSubmit={loginSubmit}>
                <h2>Login</h2>
                <input type="email" name="email" required
                    placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />

                <input type="password" name="password" required autoComplete="on"
                    placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

                <div className="row">
                    <button type="submit">Login</button>
                    <Link to="/register">Register</Link>
                </div>
            </form>
        </div>
    )
}

export default Login