import React, { useContext } from 'react'
import ContactContext from '../../context/contact/contactContext'

const ContactItem = ({contact}) => {
    
    const contactContext=useContext(ContactContext)

    const {name,email,phone,type,id}=contact

    const onClick=()=>{
        contactContext.deleteContact(id)
        contactContext.clearCurrent()
    }

    return (
        <div className="card bg-light">
            <h3 className="text-light text-left">
                <i className="fa fa-user" />{' '}{name}
                <span style={{float:'right'}} className={'badge '+ (type === 'professional'?'badge-success':'badge-primary')}>
                    {type.toUpperCase()}
                </span>
            </h3>
            <ul className="list">
                {email && (<li>
                    <i className="fa fa-envelope-open"></i>{' '}{email}
                </li>)}
                {phone && (<li>
                    <i className="fa fa-phone" />{' '}{phone}
                </li>)}
            </ul>
            <p>
                <button className="btn btn-dark btn-sm" onClick={()=> contactContext.setCurrent(contact)}>
                    Edit
                </button>
                <button onClick={onClick} className="btn btn-danger btn-sm">
                    Delete
                </button>
            </p>
        </div>
    )
}

export default ContactItem
