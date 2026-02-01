import React from 'react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-6">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-2xl text-center shadow-2xl border border-white/20">
                <h1 className="text-5xl font-extrabold mb-6 tracking-tight">Voter Registration</h1>
                <p className="text-xl mb-8 font-light leading-relaxed">
                    Welcome to the secure online voter registration portal.
                    Verifying your identity using Aadhaar and Facial Recognition is now faster and safer than ever.
                </p>

                <div className="space-y-4 mb-8 text-left bg-black/20 p-6 rounded-lg">
                    <h3 className="font-bold text-lg mb-2">Requirements:</h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm md:text-base opacity-90">
                        <li>Valid 12-digit Aadhaar Number</li>
                        <li>Linked Mobile Number</li>
                        <li>Camera access for Facial Biometric Enrollment</li>
                    </ul>
                </div>

                <button
                    onClick={() => navigate('/identity')}
                    className="bg-white text-indigo-700 hover:bg-indigo-50 font-bold py-4 px-10 rounded-full transition-all transform hover:scale-105 shadow-lg text-lg"
                >
                    Start Registration
                </button>
            </div>
        </div>
    );
};

export default Landing;
