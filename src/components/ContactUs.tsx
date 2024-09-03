import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapMarkerAlt, faClock } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Footer from './Footer';
import Header from './Header';

const ContactUs: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const { name, email, subject, message } = formData;

        // Validate form inputs
        if (!name || !email || !subject || !message) {
            toast.error('Please fill in all fields before submitting.', {
                position: 'top-right', // Fix the position prop type
                autoClose: 3000,
                hideProgressBar: false,
            });
            return;
        }

        // Handle form submission logic here
        console.log(formData);

        // Trigger a success toaster
        toast.success('Your message has been sent successfully!', {
            position: 'top-right', // Fix the position prop type
            autoClose: 3000,
            hideProgressBar: false,
            style: {
                backgroundColor: '#fbbf24', // Matches the yellow color from your sign-in page
                color: '#ffffff'
              }
        });

        // Reset form after submission
        setFormData({
            name: '',
            email: '',
            subject: '',
            message: '',
        });
    };

    return (
        <div>
            <Header />
            <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 flex flex-col items-center justify-center px-6 py-12">
                <div className="bg-white rounded-2xl shadow-lg p-10 max-w-7xl w-full">
                    <h2 className="text-5xl font-bold text-center text-gray-800 mb-4">Get In Touch</h2>
                    <p className="text-center text-gray-600 mb-10">
                        We'll create high-quality linkable content and build at least 40 high-authority links to each asset, paving the way for you to grow your rankings and improve your brand.
                    </p>
                    <div className="flex flex-col md:flex-row md:space-x-10">
                        {/* Contact Information Card */}
                        <div className="bg-yellow-500 text-white rounded-xl p-8 md:w-1/3 flex flex-col justify-between shadow-lg">
                            <div>
                                <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                                <p className="mb-6">
                                    We’re here to help and answer any question you might have. We look forward to hearing from you!
                                </p>
                            </div>
                            <div className="space-y-4">
                                <p className="flex items-center"><FontAwesomeIcon icon={faPhone} className="mr-2" /> +8801778917666</p>
                                <p className="flex items-center"><FontAwesomeIcon icon={faPhone} className="mr-2" /> +988678363866</p>
                                <p className="flex items-center"><FontAwesomeIcon icon={faEnvelope} className="mr-2" /> Support@uprangly.com</p>
                                <p className="flex items-center"><FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" /> New York, USA</p>
                                <p className="flex items-center"><FontAwesomeIcon icon={faClock} className="mr-2" /> Mon-Fri: 9:00 AM - 6:00 PM</p>
                            </div>
                        </div>
                        
                        {/* Contact Form */}
                        <div className="bg-white rounded-xl p-8 md:w-2/3 shadow-lg">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="flex space-x-6">
                                    <div className="w-1/2">
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Your Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="mt-2 block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                        />
                                    </div>
                                    <div className="w-1/2">
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Your Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="mt-2 block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Your Subject</label>
                                    <input
                                        type="text"
                                        name="subject"
                                        id="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="mt-2 block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                                    <textarea
                                        name="message"
                                        id="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={6}
                                        className="mt-2 block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                    ></textarea>
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        className="w-full py-3 px-6 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-md shadow-md transition duration-300 ease-in-out"
                                    >
                                        Send Message
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <ToastContainer />
        </div>
    );
};

export default ContactUs;
