import React, { Fragment, useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/auth/authContext'


const Navbar = ({title,icon}) => {
    
    const authContext=useContext(AuthContext)

    const onClick= () =>{
        authContext.logout()
    }

    const AuthLinks=(
        <Fragment>
            <li>
                Hello {authContext.user && authContext.user.name}
            </li>
            <li>
                <a onClick={onClick} href='#!'>
                    Logout
                </a>
            </li>
        </Fragment>
    )

    const GuestLinks=(
        <Fragment>
                <li>
                    <Link to='/register'>Register</Link>
                </li>
                <li>
                    <Link to='/login'>Login</Link>
                </li>
        </Fragment>
    )

    return (
        <div className="navbar bg-primary">
            <h1>
                Contact Manager
            </h1>
            <ul>
            {authContext.isAuthenticated ? AuthLinks:GuestLinks}
            </ul>
        </div>
    )
}

export default Navbar
