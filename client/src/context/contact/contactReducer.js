import {
    ADD_CONTACT,
    DELETE_CONTACT,
    CLEAR_CURRENT,
    SET_ALERT,
    REMOVE_ALERT,
    CLEAR_FILTER,
    SET_CURRENT, UPDATE_CONTACT, FILTER_CONTACTS
}from '../types'

export default (state,action)=>{
    switch(action.type){
        case ADD_CONTACT:
            return{
                ...state,
                contacts:[...state.contacts,action.payload]
            }
        case DELETE_CONTACT:
            return{
                ...state,
                contacts:state.contacts.filter(contact =>{
                    return contact.id!==action.payload
                })
            }
        case SET_CURRENT:
            return{
                ...state,
                current:action.payload
            }
        case CLEAR_CURRENT:
            return{
                ...state,
                current:null
            }
        case UPDATE_CONTACT:
            return{
                ...state,
                contacts:[...state.contacts.map(contact =>{
                    return contact.id===action.payload.id ? action.payload:contact
                })]
            }
        case FILTER_CONTACTS:
            return{
                ...state,
                filtered:state.contacts.filter(contact =>{
                    const regex=new RegExp(`${action.payload}`,'gi')
                    return contact.name.match(regex)||contact.email.match(regex)
                })
            }
        case CLEAR_FILTER:
            return{
                ...state,
                filtered:null
            }
        default:
            return state;
    }
}