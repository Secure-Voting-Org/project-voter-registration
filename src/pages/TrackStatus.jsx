import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const TrackStatus = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <Header />

            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                <div className="bg-white p-8 rounded-2xl shadow-md max-w-md w-full">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Track Application Status</h2>
                    <p className="text-gray-500 mb-6">Enter your Reference ID to check the current status of your application.</p>

                    <input
                        type="text"
                        placeholder="Enter Reference ID"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 mb-4 focus:ring-2 focus:ring-purple-500 outline-none"
                    />

                    <button className="w-full bg-purple-600 text-white py-3 rounded-lg font-bold hover:bg-purple-700 transition-colors">
                        Track Status
                    </button>

                    <button
                        onClick={() => navigate('/dashboard')}
                        className="mt-4 text-sm text-gray-500 hover:text-gray-700 hover:underline"
                    >
                        Back to Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TrackStatus;
