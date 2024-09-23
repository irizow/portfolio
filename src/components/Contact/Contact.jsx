import styles from './contact.module.css'
import { useState } from 'react';
import emailjs from '@emailjs/browser'
import mailGif from '../../assets/images/mailgif.gif'

export default function Contact() {
    const templateId = import.meta.env.VITE_REACT_APP_TEMPLATE_ID;
    const serviceId = import.meta.env.VITE_REACT_APP_SERVICE_ID;
    const publicKey = import.meta.env.VITE_REACT_APP_PUBLIC_KEY;

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    })

    const [isSubmitted, setIsSubmitted] = useState(false);
    

    const handleInputChange = (e)=> {
        const { name, value } = e.target;
        setFormData({
            ...formData, 
            [name] : value})
    }

    const handleSubmit = (e)=> {
        e.preventDefault();
        emailjs.sendForm(serviceId, templateId, e.target, publicKey)
        .then(()=> {
            console.log('email sent correctly');
            setIsSubmitted(true)
        }, (error) => {
            alert('Something went wrong when trying to contact me')
            console.log(error);
        })

    }

    return (
        <div className={styles.contactform}>
            {isSubmitted ? 
            <>
            <div>
            <h3>Your mesage was sent!</h3>
            <span>I will get back to you asap!</span>
            </div>
            <img src={mailGif} alt='gif of a mouse sending an email'></img>
            </>
             : 
        
            <>
            <div>
            <h2>Let's have a chat!</h2>
            </div>
            <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input 
                value={formData.name}
                type='text'
                name='name'
                onChange={handleInputChange}>
                </input>
            </label>
            <label>
                Email:
                <input
                value={formData.email}
                type='email'
                name='email'
                onChange={handleInputChange}>
                </input>

            </label>
            <label>
                Message:
                <textarea
                value={formData.message}
                name='message'
                onChange={handleInputChange}>
                </textarea>

            </label>
            <button type='submit'>
                Contact me!
            </button>
            </form>
            </>}
        </div>

    )
}