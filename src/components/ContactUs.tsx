import React, { useState } from 'react';
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
        // Handle form submission logic here
        console.log(formData);
    };

    return (
        <div>
            <Header />
        <div className="min-h-screen bg-white flex items-center justify-center px-4">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl w-full">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Get In Touch</h2>
                <p className="text-center text-gray-600 mb-8">
                    We'll create high-quality linkable content and build at least 40 high-authority links to each asset, paving the way for you to grow your rankings and improve your brand.
                </p>
                <div className="flex flex-col md:flex-row md:space-x-6">
                    <div className="bg-yellow-500 rounded-lg p-6 md:w-1/3 text-white shadow-lg">
                        <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                        <p className="mb-4">We'll create high-quality linkable content and build at least 40 high-authority.</p>
                        <p className="flex items-center mb-2"><span className="material-icons mr-2">phone</span> +8801778917666</p>
                        <p className="flex items-center mb-2"><span className="material-icons mr-2">phone</span> +988678363866</p>
                        <p className="flex items-center mb-2"><span className="material-icons mr-2">email</span> Support@uprangly.com</p>
                        <p className="flex items-center"><span className="material-icons mr-2">location_on</span> New York, USA</p>
                    </div>
                    <div className="bg-white rounded-lg p-6 md:w-2/3 shadow-lg">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="flex space-x-4">
                                <div className="w-1/2">
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Your Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
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
                                        className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
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
                                    className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
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
                                    rows={5}
                                    className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
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
    </div>
    );
};

export default ContactUs;
