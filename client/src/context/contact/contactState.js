import React from 'react'
import {v4} from 'uuid'
import contactContext from './contactContext'
import contactReducer from './contactReducer'
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    CLEAR_CURRENT,
    SET_ALERT,
    REMOVE_ALERT,
    CLEAR_FILTER,
    SET_CURRENT, UPDATE_CONTACT, FILTER_CONTACTS
}from '../types'

const ContactState= props =>{
    const initialState={
        contacts:[{
            id:1,
            name:'Vansh',
            email:'vansh@gmail.com',
            phone:'9998887771',
            type:'personal'
        },
        {
            id:2,
            name:'Mudit',
            email:'mudit@gmail.com',
            phone:'9997771888',
            type:'professional'
        },
        {
            id:3,
            name:'Aryan',
            email:'aryan@gmail.com',
            phone:'8889997771',
            type:'personal'
        }
        ],
        current:null,
        filtered:null
    }
    const [state,dispatch]=React.useReducer(contactReducer,initialState)

    const addContact = contact =>{
        contact.id=v4()
        dispatch({
            type:ADD_CONTACT,
            payload:contact
        })
    }

    const deleteContact=id=>{
        dispatch({
            type:DELETE_CONTACT,
            payload:id
        })
    }

    const setCurrent = contact =>{
        dispatch({
            type:SET_CURRENT,
            payload:contact
        })
    }

    const clearCurrent=()=>{
        dispatch({
            type:CLEAR_CURRENT
        })
    }

    const updateContact = contact =>{
        dispatch({
            type:UPDATE_CONTACT,
            payload:contact
        })
    }

    const filterContacts = text =>{
        dispatch({
            type:FILTER_CONTACTS,
            payload:text
        })
    }

    const clearFilter = () =>{
        dispatch({
            type:CLEAR_FILTER
        })
    }

    return(
        <contactContext.Provider
            value={{
                contacts:state.contacts,
                addContact,
                deleteContact,
                current:state.current,
                setCurrent,
                clearCurrent,
                updateContact,
                filtered:state.filtered,
                filterContacts,
                clearFilter
            }}
        >
            {props.children}
        </contactContext.Provider>
    )
}

export default ContactState