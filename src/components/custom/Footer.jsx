import React from 'react';
import { FaFacebook, FaInstagram, FaXTwitter, FaLinkedin } from 'react-icons/fa6';

function Footer() {
    return (
        <footer className="w-full bg-gray-900 mt-auto py-4">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center">
                    {/* Social Media Icons - Left Side */}
                    <div className="flex gap-6">
                        <a href="https://www.facebook.com/share/1BwLtgR3YT/" className="text-white hover:text-[#f56551] transition-colors">
                            <FaFacebook className="w-6 h-6" />
                        </a>
                        <a href="https://www.instagram.com/amarnath_2908?igsh=MWw4dnNmd3k5aDNnNg==" className="text-white hover:text-[#f56551] transition-colors">
                            <FaInstagram className="w-6 h-6" />
                        </a>
                        <a href="https://x.com/Amarnath200508?t=sPZQDOTaQ4ATyUQ7LNVWLw&s=09" className="text-white hover:text-[#f56551] transition-colors">
                            <FaXTwitter className="w-6 h-6" />
                        </a>
                        <a href="https://www.linkedin.com/in/amar-nath-9262482b9" className="text-white hover:text-[#f56551] transition-colors">
                            <FaLinkedin className="w-6 h-6" />
                        </a>
                    </div>

                    {/* Text Content - Right Side */}
                    <div className="text-white text-right">
                        <p className="mb-2">Your AI-Powered Travel Companion</p>
                        <p className="text-sm">© {new Date().getFullYear()} TravelEase. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer; 