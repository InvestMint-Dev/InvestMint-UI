import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './contact-us-page.css';


export const ContactUsPage = () => {
    const [formData, setFormData] = useState({
        email: "",
        title: "",
        message: ""
    });
    const [errors, setErrors] = useState({});
    const [submitButtonClicked, setSubmitButtonClicked] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        document.title = 'Contact Us | InvestMint';
    }, []); // Empty dependency array means this effect runs once after the initial render

    const validateForm = () => {
        const newErrors = {};
        if (!formData.email) {
            newErrors.email = "Email is required.";
        }
        else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid.";
        }

        if (!formData.title) {
            newErrors.title = "Title is required.";
        }
        if (!formData.message) {
            newErrors.message = "Message is required.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
        
        // Clear errors when user starts typing
        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const handleSend = async () => {
        setSubmitButtonClicked(true);
        setErrors({});
        
        if (validateForm()) {
            setIsSubmitting(true);
            try {
                const response = await axios.post(
                    `${process.env.REACT_APP_API_BASE_URL}/api/sendEmail`,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                );
                
                if (response.status === 200) {
                    setSuccessMessage("Message sent successfully.");
                    // Clear form after successful submission
                    setFormData({ email: "", title: "", message: "" });
                    setSubmitButtonClicked(false);
                }
            } catch (error) {
                console.error("Error sending message:", error);
                setErrors({
                    general: error.response?.data?.error || 
                            "Failed to send the message. Please try again later."
                });
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    return (
        <div className="contact-us-container">
            <h1>Contact Us</h1>
            
            {errors.general && (
                <div className='form-error'>{errors.general}</div>
            )}
            
            <textarea
                style={{ border: (errors.email && submitButtonClicked) ? "3px solid #71CCA8" : "none" }}
                name="email"
                className="form-textarea"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                disabled={isSubmitting}
            />
            {errors.email && <p className='form-error'>{errors.email}</p>}

            <textarea
                style={{ border: (errors.title && submitButtonClicked) ? "3px solid #71CCA8" : "none" }}
                name="title"
                className="form-textarea"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
                disabled={isSubmitting}
            />
            {errors.title && <p className='form-error'>{errors.title}</p>}

            <textarea
                style={{ border: (errors.message && submitButtonClicked) ? "3px solid #71CCA8" : "none" }}
                name="message"
                className="form-textarea message-container"
                placeholder="Type your message here ..."
                value={formData.message}
                onChange={handleChange}
                disabled={isSubmitting}
            />
            {errors.message && <p className='form-error'>{errors.message}</p>}

            {successMessage && <p className='form-success'>{successMessage}</p>}

            <button 
                onClick={handleSend} 
                className='form-submit-button'
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Sending...' : 'Send'}
            </button>
        </div>
    );
};