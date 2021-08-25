import React from 'react'
import {v4} from 'uuid'
import alertContext from './alertContext'
import alertReducer from './alertReducer'
import {
    SET_ALERT,
    REMOVE_ALERT
}from '../types'

const AlertState= props =>{
    const initialState=[]

    const [state,dispatch]=React.useReducer(alertReducer,initialState)

    const setAlert = (msg,type)=>{
        const id=v4()
        dispatch({
            type:SET_ALERT,
            payload:{
                id,
                msg,
                type
            }
        })

        setTimeout(()=>{
            dispatch({
                type:REMOVE_ALERT,
                payload:id
            })
        },5000)
    }

    return(
        <alertContext.Provider
            value={{
                alerts:state,
                setAlert
            }}
        >
            {props.children}
        </alertContext.Provider>
    )
}

export default AlertState