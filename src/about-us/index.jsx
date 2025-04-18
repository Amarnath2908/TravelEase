import React, { useState, useEffect } from 'react';
import { FaBrain, FaChartLine, FaPhoneFlip } from 'react-icons/fa6';
import emailjs from '@emailjs/browser';
import { toast } from 'sonner';

function AboutUs() {
    // Get user email from localStorage if user is logged in
    const user = JSON.parse(localStorage.getItem('user')) || null;
    const userEmail = user ? user.email : '';

    const [feedback, setFeedback] = useState({
        name: '',
        email: userEmail,
        message: '',
        type: 'feedback'
    });

    useEffect(() => {
        emailjs.init("aZO7kou8JUtRem523");
    }, []);

    // If user logs in/out during the session, update the email field
    useEffect(() => {
        if (user && user.email) {
            setFeedback(prev => ({ ...prev, email: user.email }));
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await emailjs.send(
                "service_lfyjstr",
                "template_i9k8b8q",
                {
                    from_name: feedback.name,
                    from_email: feedback.email,
                    message: feedback.message,
                    type: feedback.type
                }
            );
            toast.success('Thank you for your feedback!');
            setFeedback(prev => ({ ...prev, name: '', message: '', type: 'feedback' })); // Keep email if user is logged in
        } catch (error) {
            console.error('Error sending email:', error);
            toast.error('Failed to send feedback. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-[url('/373571.jpg')] bg-cover bg-center bg-no-repeat relative">
            <div className="absolute inset-0 bg-black opacity-40"></div>

            <div className="relative z-10 min-h-screen">
                {/* Hero Section - No Gradient */}
                <div className='relative h-[250px] mb-12 flex flex-col items-center justify-center text-white px-4 text-center'>
                    <h1 className='text-4xl font-bold mb-4'>About-TravelEase</h1>
                    <p className='text-xl max-w-2xl'>Your Smart Travel Companion</p>
                </div>

                {/* Main Content */}
                <div className='max-w-6xl mx-auto px-4 pb-12'>
                    {/* Features */}
                    <div className='grid md:grid-cols-3 gap-8 mb-12'>
                        {[
                            {
                                icon: <FaBrain className="w-8 h-8 text-blue-500 mb-4" />,
                                title: 'Why TravelEase?',
                                text: `TravelEase, launched in 2024, uses AI to make travel planning effortless.
We craft trips to your style and budget.
Your next trip, perfectly planned—just for you.`
                            },
                            {
                                icon: <FaChartLine className="w-8 h-8 text-purple-500 mb-4" />,
                                title: 'Generated Trips',
                                text: `Over 100+ trips generated
Growing community of happy travelers`
                            },
                            {
                                icon: <FaPhoneFlip className="w-8 h-8 text-pink-500 mb-4 transform scale-x-[-1]" />,
                                title: 'Contact Us',
                                text: `Phone: +917989395899
Email: travelEase@gmail.com
HelpLine: 18605001066`
                            }
                        ].map((box, idx) => (
                            <div
                                key={idx}
                                className='bg-white/40 backdrop-blur-lg rounded-lg p-6 shadow-lg border border-white/20 flex flex-col items-center text-center 
                                transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-white/50'
                            >
                                <div className="bg-white/60 p-3 rounded-full mb-2 backdrop-blur-sm">
                                    {box.icon}
                                </div>
                                <h3 className='text-xl font-semibold mb-2'>{box.title}</h3>
                                <p className='text-gray-800 whitespace-pre-line'>{box.text}</p>
                            </div>
                        ))}
                    </div>

                    {/* Two Column Layout */}
                    <div className='grid md:grid-cols-2 gap-8 mt-16'>
                        {/* Feedback Form */}
                        <div className='bg-white/40 backdrop-blur-lg rounded-lg p-8 shadow-lg border border-white/20 hover:bg-white/50 transition-all duration-300'>
                            <h2 className='text-2xl font-bold mb-6'>We'd Love to Hear From You!</h2>
                            <form onSubmit={handleSubmit} className='space-y-6'>
                                <div>
                                    <label className='block text-sm font-medium text-gray-700 mb-1'>Your Name</label>
                                    <input
                                        type="text"
                                        required
                                        className='w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent'
                                        value={feedback.name}
                                        onChange={(e) => setFeedback({ ...feedback, name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className='block text-sm font-medium text-gray-700 mb-1'>Your Email</label>
                                    <input
                                        type="email"
                                        required
                                        className='w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent'
                                        value={feedback.email}
                                        onChange={(e) => setFeedback({ ...feedback, email: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className='block text-sm font-medium text-gray-700 mb-1'>Type</label>
                                    <select
                                        className='w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent'
                                        value={feedback.type}
                                        onChange={(e) => setFeedback({ ...feedback, type: e.target.value })}
                                    >
                                        <option value="feedback">Feedback</option>
                                        <option value="complaint">Complaint</option>
                                        <option value="suggestion">Suggestion</option>
                                    </select>
                                </div>
                                <div>
                                    <label className='block text-sm font-medium text-gray-700 mb-1'>Your Message</label>
                                    <textarea
                                        required
                                        rows={4}
                                        className='w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent'
                                        value={feedback.message}
                                        onChange={(e) => setFeedback({ ...feedback, message: e.target.value })}
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className='w-full bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 transition-colors focus:ring-2 focus:ring-purple-500 focus:ring-offset-2'
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>

                        {/* CTA */}
                        <div className='flex flex-col justify-center h-full'>
                            <div className='bg-white/40 backdrop-blur-lg rounded-lg p-8 shadow-lg border border-white/20 w-full flex flex-col hover:bg-white/50 transition-all duration-300'>
                                <div className='w-full text-center'>
                                    <h2 className='text-3xl font-bold mb-6 text-gray-900'>Ready to Plan Your Trip?</h2>
                                    <p className='text-xl text-gray-600 mb-8'>
                                        Start your journey with TravelEase today and discover amazing destinations tailored just for you.
                                    </p>
                                </div>
                                <div className='flex justify-center w-full'>
                                    <a
                                        href="/create-trip"
                                        className='inline-block bg-blue-500 text-white px-10 py-4 rounded-full font-semibold hover:bg-blue-600 transition-colors text-lg'
                                    >
                                        Plan Your Trip
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;
