import React from 'react'
import authContext from './authContext'
import authReducer from './authReducer'
import axios from 'axios'
import setAuthToken from '../../components/utils/setAuthToken'
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    CLEAR_ERRORS,
    LOGOUT
}from '../types'

const AuthState= props =>{
    const initialState={
        token:localStorage.getItem('token'),
        loading:true,
        isAuthenticated:null,
        error:null,
        user:null
    }
    const [state,dispatch]=React.useReducer(authReducer,initialState)

    const loadUser= async () =>{
        if(localStorage.token){
            setAuthToken(localStorage.token)
        }
        try {
            const response=await axios.get('/api/auth')

            dispatch({
                type:USER_LOADED,
                payload:response.data
            })
        } catch (error) {
            dispatch({
                type:AUTH_ERROR
            })
        }
    }

    const register = async data =>{
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }
        try {
            const response=await axios.post('/api/users',data,config)
            console.log(response)
            dispatch({
                type:REGISTER_SUCCESS,
                payload:response.data
            })
            loadUser()
        } catch (error) {
            dispatch({
                type:REGISTER_FAIL,
                payload:error.response.data.msg
            })
        }
    }

    const login = async data =>{
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }
        try {
            const response=await axios.post('/api/auth',data,config)
            console.log(response)
            dispatch({
                type:LOGIN_SUCCESS,
                payload:response.data
            })
            loadUser()
        } catch (error) {
            dispatch({
                type:LOGIN_FAIL,
                payload:error.response.data.msg
            })
        }
    }

    const clearError = ()=>{
        dispatch({
            type:CLEAR_ERRORS,
        })
    }

    const logout = () =>{
        dispatch({
            type:LOGOUT
        })
    }

    
    return(
        <authContext.Provider
            value={{
                token:state.token,
                isAuthenticated:state.isAuthenticated,
                user:state.user,
                loading:state.loading,
                error:state.error,
                register,
                clearError,
                loadUser,
                login,
                logout
            }}
        >
            {props.children}
        </authContext.Provider>
    )
}

export default AuthState