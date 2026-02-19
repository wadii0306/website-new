import React from 'react'
import FeaturesCard from './FeaturesCard'

export const FeaturesHeader = () => {
    return (
        <div className="text-center max-w-4xl mx-auto px-6 py-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Complete Banquet Management Solution
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Transform your banquet hall operations with our all-in-one CRM platform. 
                From seamless booking management to real-time analytics, Wadii empowers you to 
                deliver exceptional events while maximizing revenue and efficiency.
            </p>
            <div className="mt-8 flex justify-center gap-8 flex-wrap">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">Smart Booking</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">Real-time Analytics</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">Client Management</span>
                </div>
            </div>
            <FeaturesCard />
        </div>
    )
}