import React, { useState } from 'react';

export const ContactUsPage = () => {
    const [formData, setFormData] = useState({
        email: "",
        title: "",
        message: ""
    });
    const [errors, setErrors] = useState({});
    const [submitButtonClicked, setSubmitButtonClicked] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const validateForm = () => {
        const newErrors = {};
        if (!formData.email) {
            newErrors.email = "Email is required.";
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
    };

    const handleSend = () => {
        setSubmitButtonClicked(true);
        if (validateForm()) {
            // Code to send the form data to backend
            setSuccessMessage("Message sent successfully.");
            console.log("Message sent successfully.");
        }
    };

    return (
        <div className="forgot-password-container">
            <h1>Contact Us</h1>
            
            <textarea
                name="email"
                className="form-textarea"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
            ></textarea>
            {errors.email && <p style={{ color: '#61b090' }}>{errors.email}</p>}

            <textarea
                name="title"
                className="form-textarea"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
            ></textarea>
            {errors.title && <p style={{ color: '#61b090' }}>{errors.title}</p>}

            <textarea
                name="message"
                className="form-textarea"
                placeholder="Type your message here ..."
                value={formData.message}
                onChange={handleChange}
            ></textarea>
            {errors.message && <p style={{ color: '#61b090' }}>{errors.message}</p>}

            {successMessage && <p className='form-success'>{successMessage}</p>}

            <button onClick={handleSend} className='form-submit-button'>
                Send
            </button>
        </div>
    );
};
