import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Success = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    // Prevent direct access
    if (!state?.voterId) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <button onClick={() => navigate('/')} className="text-blue-600 underline">Return to Home</button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center p-6 text-center">
            <div className="bg-white p-10 rounded-2xl shadow-xl border-t-8 border-green-500 max-w-lg w-full">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                </div>

                <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Registration Successful!</h1>
                <p className="text-gray-600 mb-8">You are now a registered voter.</p>

                <div className="bg-gray-50 p-6 rounded-xl border border-dashed border-gray-300 mb-8">
                    <p className="text-sm text-gray-500 uppercase tracking-widest font-semibold mb-1">Your Voter ID</p>
                    <p className="text-4xl font-mono font-bold text-gray-800 break-all">{state.voterId}</p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg mb-8 text-blue-800 text-sm">
                    <strong>Note:</strong> Please save your Voter ID. You will need it, along with your face scan, to cast your vote.
                </div>

                <button
                    onClick={() => navigate('/')}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-colors"
                >
                    Return to Home
                </button>
            </div>
        </div>
    );
};

export default Success;
