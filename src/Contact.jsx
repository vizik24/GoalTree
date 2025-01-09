import React, { useState } from 'react';
import { db } from './firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

import Nav from './components/Nav';
import Footer from './components/Footer'

function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await addDoc(collection(db, "contacts"), {
                ...formData,
                createdAt: new Date() // Optionally add a timestamp
            });
            alert('Thank you for your message!');
            setFormData({ name: '', email: '', message: '' }); // Reset form after submission
        } catch (error) {
            console.error("Error adding document: ", error);
            alert('Error sending message. Please try again.');
        }
    };

    return (
        <>
        <Nav />
        <div className="flex flex-col min-h-screen">
            
            <div className="flex-grow flex justify-center">
                
                <div className="container mx-auto px-4 py-8">
                <h1 className='text-5xl font-bold mb-10'>Get in touch</h1>
                <p className='mb-10'>We'll make it our goal to get back to you.</p>
                    <form onSubmit={handleSubmit} className="form-control w-full max-w-md mx-auto">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input 
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your name"
                            className="input input-bordered w-full"
                            required
                        />
                        
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input 
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Your email"
                            className="input input-bordered w-full"
                            required
                        />
                        
                        <label className="label">
                            <span className="label-text">Message</span>
                        </label>
                        <textarea 
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Your message"
                            className="textarea textarea-bordered h-24"
                            required
                        ></textarea>
                        
                        <button type="submit" className="btn btn-primary mt-4">Send</button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
        </>
    );
}

export default ContactForm;
