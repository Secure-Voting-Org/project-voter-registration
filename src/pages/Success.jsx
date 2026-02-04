import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ECILayout from '../components/ECILayout';

const Success = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { voterId, referenceId, name } = location.state || {};

    // Prevent direct access if no state
    if (!voterId) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
                <p className="text-gray-600 mb-4">No submission data found.</p>
                <button
                    onClick={() => navigate('/')}
                    className="text-white bg-blue-600 px-6 py-2 rounded hover:bg-blue-700"
                >
                    Return to Home
                </button>
            </div>
        );
    }

    return (
        <ECILayout activeStep="Success">
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
                <div className="bg-green-100 p-4 rounded-full mb-6">
                    <svg className="w-16 h-16 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                </div>

                <h2 className="text-3xl font-bold text-gray-800 mb-4">Application Submitted!</h2>

                <p className="text-gray-600 mb-8 max-w-md">
                    Thank you, <span className="font-bold text-gray-800">{name || 'User'}</span>. Your application for voter registration has been submitted.
                </p>

                <div className="grid gap-4 w-full max-w-md mb-8">
                    <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm">
                        <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">Application Reference ID</p>
                        <p className="text-2xl font-mono font-bold text-purple-600 select-all">{referenceId || 'N/A'}</p>
                        <p className="text-xs text-gray-400 mt-1">Use this to track your application status.</p>
                    </div>

                    <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm">
                        <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">Voter ID</p>
                        <p className="text-xl font-mono font-bold text-gray-800 select-all">{voterId}</p>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
                    <button
                        onClick={() => navigate('/track-status')}
                        className="flex-1 px-6 py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 shadow-sm transition-colors"
                    >
                        Track Status
                    </button>
                    <button
                        onClick={() => navigate('/')}
                        className="flex-1 px-6 py-3 bg-white border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        </ECILayout>
    );
};

export default Success;
