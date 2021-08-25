import React, { useContext, useEffect, useState } from 'react'
import ContactContext from '../../context/contact/contactContext'

const ContactForm = () => {

    const contactContext=useContext(ContactContext)

    const [contact,setContact]=useState({
        name:'',
        phone:'',
        type:'personal',
        email:''
    })

    useEffect(()=>{
        if(contactContext.current){
            setContact(contactContext.current)
        }else{
            setContact({
                name:'',
                phone:'',
                type:'personal',
                email:''
            })
        }
    },[contactContext,contactContext.current])

    const {name,type,email,phone}=contact

    const onChange=e=>{
        setContact({
            ...contact,[e.target.name]:e.target.value
        })
    }

    const onSubmit = e=>{
        if(contactContext.current === null){
            contactContext.addContact(contact)
        }else{
            contactContext.updateContact(contact)
        }
        contactContext.clearCurrent()
        e.preventDefault()
    }

    const clearAll=()=>{
        contactContext.clearCurrent()
    }


    return (
        <form onSubmit={onSubmit}>
            <h2 className='text-primary'>
                {contactContext.current===null ? 'Add Contact':'Edit Contact'}
            </h2>
            <input type='text' placeholder="Name" name="name" value={name} onChange={onChange} />
            <input type='email' placeholder="Email" name="email" value={email} onChange={onChange} />
            <input type='text' placeholder="Phone Number" name="phone" value={phone} onChange={onChange} />
            <h5>Contact Type</h5>
            <input type="radio" name="type" value="personal" checked={type === 'personal'} onChange={onChange} /> Personal{''}
            <input type="radio" name="type" value="professional" checked={type === 'professional'} onChange={onChange} /> Professional
            <div>
                <input type="submit" value={contactContext.current ? 'Edit':'Add'} className="btn btn-primary btn-block" />
            </div>
            {contactContext.current && <div>
                    <button className="btn btn-dark btn-block" onClick={clearAll}>
                        Clear All
                    </button>
                </div>}
        </form>
    )
}

export default ContactForm
