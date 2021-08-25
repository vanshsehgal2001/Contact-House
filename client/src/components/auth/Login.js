import React, { useState,useEffect,useContext } from 'react'
import AlertContext from '../../context/alert/alertContext'
import AuthContext from '../../context/auth/authContext'

const Login = (props) => {

    const alertContext=useContext(AlertContext)
    const authContext=useContext(AuthContext)

    const [user,setUser]=useState({
        email:'',
        password:''
    })

    useEffect(()=>{

        if(authContext.isAuthenticated){
            props.history.push('/')
        }

        if(authContext.error === 'Invalid credentials'){
            alertContext.setAlert(authContext.error,'danger')
            authContext.clearError()
        }
    },[authContext.error,authContext.isAuthenticated])

    const {email,password}=user

    const onChange = e =>{
        setUser({
            ...user,
            [e.target.name]:e.target.value
        })
    }

    const onSubmit = e=>{
        e.preventDefault()
        authContext.login({
            email,
            password
        })
    }

    return (
        <div className="form-container">
            <h1>
                Login
            </h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="email">
                        Email
                    </label>
                    <input required type="email" name="email" placeholder="Enter Email" value={email} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">
                        Password
                    </label>
                    <input required type="password" name="password" placeholder="Enter Password" value={password} onChange={onChange} />
                </div>
                <div>
                    <input type="submit" value="Login" className="btn btn-primary btn-block" />
                </div>
            </form>
        </div>
    )
}

export default Login
