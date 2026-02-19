import React from 'react';

export const PricingSection = () => {
    return (
        <section id="pricing-section" className="w-full py-20 bg-gray-50">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Simple, Transparent Pricing
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Choose the perfect plan for your banquet hall business. 
                        No hidden fees, no surprises.
                    </p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Basic Plan */}
                    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Basic</h3>
                        <p className="text-gray-600 mb-6">Perfect for small banquet halls</p>
                        <div className="mb-6">
                            <span className="text-4xl font-bold text-gray-900">$99</span>
                            <span className="text-gray-600">/month</span>
                        </div>
                        <ul className="space-y-3 mb-8">
                            <li className="flex items-center text-gray-700">
                                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                                Up to 50 bookings/month
                            </li>
                            <li className="flex items-center text-gray-700">
                                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                                Basic analytics
                            </li>
                            <li className="flex items-center text-gray-700">
                                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                                Email support
                            </li>
                        </ul>
                        <button className="w-full py-3 px-6 border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors">
                            Get Started
                        </button>
                    </div>

                    {/* Pro Plan */}
                    <div className="bg-purple-600 rounded-2xl shadow-xl p-8 text-white transform scale-105">
                        <div className="bg-yellow-400 text-purple-900 text-sm font-semibold px-3 py-1 rounded-full inline-block mb-4">
                            MOST POPULAR
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Professional</h3>
                        <p className="text-purple-100 mb-6">Ideal for growing businesses</p>
                        <div className="mb-6">
                            <span className="text-4xl font-bold">$199</span>
                            <span className="text-purple-100">/month</span>
                        </div>
                        <ul className="space-y-3 mb-8">
                            <li className="flex items-center">
                                <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                                Unlimited bookings
                            </li>
                            <li className="flex items-center">
                                <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                                Advanced analytics
                            </li>
                            <li className="flex items-center">
                                <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                                Priority support
                            </li>
                            <li className="flex items-center">
                                <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                                Custom reports
                            </li>
                        </ul>
                        <button className="w-full py-3 px-6 bg-white text-purple-600 rounded-lg hover:bg-gray-100 transition-colors font-semibold">
                            Get Started
                        </button>
                    </div>

                    {/* Enterprise Plan */}
                    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Enterprise</h3>
                        <p className="text-gray-600 mb-6">For large banquet chains</p>
                        <div className="mb-6">
                            <span className="text-4xl font-bold text-gray-900">$399</span>
                            <span className="text-gray-600">/month</span>
                        </div>
                        <ul className="space-y-3 mb-8">
                            <li className="flex items-center text-gray-700">
                                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                                Everything in Pro
                            </li>
                            <li className="flex items-center text-gray-700">
                                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                                API access
                            </li>
                            <li className="flex items-center text-gray-700">
                                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                                Dedicated support
                            </li>
                            <li className="flex items-center text-gray-700">
                                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                                Custom integrations
                            </li>
                        </ul>
                        <button className="w-full py-3 px-6 border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors">
                            Contact Sales
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};
