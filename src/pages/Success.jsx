import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ECILayout from '../components/ECILayout';

const Success = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { voterId, referenceId, name } = location.state || {};

    // Prevent direct access
    if (!state?.applicationId) {
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
            <div className="min-h-screen bg-yellow-50 flex flex-col items-center justify-center p-6 text-center">
                <div className="bg-white p-10 rounded-2xl shadow-xl border-t-8 border-yellow-500 max-w-lg w-full">
                    <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-10 h-10 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>

                    <h1 className="text-2xl font-extrabold text-gray-900 mb-2">Application Submitted!</h1>
                    <p className="text-gray-600 mb-6">Your voter registration application has been submitted for verification.</p>

                    <div className="bg-gray-50 p-6 rounded-xl border border-dashed border-gray-300 mb-6">
                        <p className="text-sm text-gray-500 uppercase tracking-widest font-semibold mb-1">Application Reference No.</p>
                        <p className="text-3xl font-mono font-bold text-gray-800 break-all">{state.applicationId}</p>
                    </div>

                    <div className="bg-yellow-50 p-4 rounded-lg mb-8 text-yellow-800 text-sm text-center">
                        <p className="font-bold mb-1">Status: PENDING VERIFICATION</p>
                        <p>An Election Officer will review your details. Once approved, your Voter ID number will be generated.</p>
                    </div>

                    <button
                        onClick={() => navigate('/')}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors"
                    >
                        Return to Home
                    </button>
                </div>
            </div>
        </ECILayout>
    );
};

export default Success;
