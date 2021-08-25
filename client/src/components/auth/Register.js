import React, { useContext, useEffect, useState } from 'react'
import AlertContext from '../../context/alert/alertContext'
import AuthContext from '../../context/auth/authContext'

const Register = props => {

    const alertContext=useContext(AlertContext)
    const authContext=useContext(AuthContext)

    const [user,setUser]=useState({
        name:'',
        email:'',
        password:'',
        confirmPassword:''
    })

    const {name,email,password,confirmPassword}=user

    useEffect(()=>{

        if(authContext.isAuthenticated){
            props.history.push('/login')
        }

        if(authContext.error === 'User already exists'){
            alertContext.setAlert(authContext.error,'danger')
            authContext.clearError()
        }
    },[authContext.error,authContext.isAuthenticated])

    const onChange = e =>{
        setUser({
            ...user,
            [e.target.name]:e.target.value
        })
    }

    const onSubmit = e=>{
        e.preventDefault()
        if(name === '' || email === ''|| password === ''){
            alertContext.setAlert('Please fill up all the details','danger')
        }
        else if(password!==confirmPassword){
            alertContext.setAlert('Passwords don\'t match','danger')
        }else{
            // console.log('Registered')
            authContext.register({
                name,
                email,
                password
            })
        }
    }

    return (
        <div className="form-container">
            <h1>
                Register
            </h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">
                        Name
                    </label>
                    <input required type="text" name="name" placeholder="Enter Name" value={name} onChange={onChange} />
                </div>
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
                    <input required minLength='6' type="password" name="password" placeholder="Enter Password" value={password} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">
                        Confirm Password
                    </label>
                    <input required type="password" name="confirmPassword" placeholder="Confirm Password" value={confirmPassword} onChange={onChange} />
                </div>
                <div>
                    <input type="submit" value="Register" className="btn btn-primary btn-block" />
                </div>
            </form>
        </div>
    )
}

export default Register
