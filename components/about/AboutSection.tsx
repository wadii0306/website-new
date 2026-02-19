import React from 'react';

export const AboutSection = () => {
    return (
        <section id="about-section" className="w-full py-20 bg-white">
            <div className="max-w-6xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-4xl font-bold text-gray-900 mb-6">
                            About Wadii Banquet Management
                        </h2>
                        <p className="text-lg text-gray-600 mb-6">
                            Founded in 2020, Wadii has become the leading CRM solution for banquet halls 
                            and event venues worldwide. We understand the unique challenges of managing 
                            events, coordinating with clients, and maximizing venue utilization.
                        </p>
                        <p className="text-lg text-gray-600 mb-8">
                            Our mission is to empower banquet hall owners with cutting-edge technology 
                            that streamlines operations, enhances customer experience, and drives revenue growth. 
                            With over 500+ venues trusting our platform, we&apos;re committed to innovation 
                            and excellence in event management.
                        </p>
                        
                        <div className="grid grid-cols-2 gap-6 mb-8">
                            <div>
                                <h3 className="text-3xl font-bold text-purple-600 mb-2">500+</h3>
                                <p className="text-gray-600">Venues Managed</p>
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold text-purple-600 mb-2">50K+</h3>
                                <p className="text-gray-600">Events Booked</p>
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold text-purple-600 mb-2">99.9%</h3>
                                <p className="text-gray-600">Uptime</p>
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold text-purple-600 mb-2">24/7</h3>
                                <p className="text-gray-600">Support</p>
                            </div>
                        </div>
                        
                        <button className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                            Learn More About Us
                        </button>
                    </div>
                    
                    <div className="relative">
                        <div className="bg-linear-to-br from-purple-100 to-pink-100 rounded-2xl p-8">
                            <div className="bg-white rounded-xl p-6 shadow-lg">
                                <h4 className="text-xl font-bold text-gray-900 mb-4">Why Choose Wadii?</h4>
                                <ul className="space-y-3">
                                    <li className="flex items-start">
                                        <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 shrink-0"></span>
                                        <span className="text-gray-700">Industry-leading booking management system</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 shrink-0"></span>
                                        <span className="text-gray-700">Real-time analytics and insights</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 shrink-0"></span>
                                        <span className="text-gray-700">Mobile-friendly interface for on-the-go management</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 shrink-0"></span>
                                        <span className="text-gray-700">Seamless integration with popular payment gateways</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 shrink-0"></span>
                                        <span className="text-gray-700">Comprehensive customer support and training</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
