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
            <div className="min-h-screen bg-white flex items-center justify-center px-6 py-12">
                <div className="bg-white rounded-xl shadow-xl p-10 max-w-5xl w-full">
                    <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">Get In Touch</h2>
                    <p className="text-center text-gray-600 mb-10">
                        We'll create high-quality linkable content and build at least 40 high-authority links to each asset, paving the way for you to grow your rankings and improve your brand.
                    </p>
                    <div className="flex flex-col md:flex-row md:space-x-8">
                        <div className="bg-yellow-500 rounded-xl p-8 md:w-1/3 text-white shadow-lg flex flex-col justify-between">
                            <div>
                                <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                                <p className="mb-6">We'll create high-quality linkable content and build at least 40 high-authority.</p>
                            </div>
                            <div>
                                <p className="flex items-center mb-4"><span className="material-icons mr-2">phone</span> +8801778917666</p>
                                <p className="flex items-center mb-4"><span className="material-icons mr-2">phone</span> +988678363866</p>
                                <p className="flex items-center mb-4"><span className="material-icons mr-2">email</span> Support@uprangly.com</p>
                                <p className="flex items-center"><span className="material-icons mr-2">location_on</span> New York, USA</p>
                            </div>
                        </div>
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
                                            className="mt-2 block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
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
                                            className="mt-2 block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
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
                                        className="mt-2 block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
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
                                        className="mt-2 block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
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
