import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FaceScanner from '../components/FaceScanner';
import { useFormContext } from '../context/FormContext';
import ECILayout from '../components/ECILayout';

const FaceEnrollment = () => {
    const navigate = useNavigate();
    const { updateFormData } = useFormContext();
    const [error, setError] = useState("");

    const handleEnroll = (descriptor) => {
        console.log("FaceEnrollment: Received descriptor from Scanner", descriptor);

        // Descriptor comes as Float32Array from `face-api.js` (inside FaceScanner)
        // Convert to standard Array for JSON serialization
        const descriptorArray = Array.from(descriptor);

        updateFormData({ faceDescriptor: descriptorArray });

        // Show success briefly before moving on
        setTimeout(() => {
            navigate('/success');
        }, 1000);
    };

    const handleScanFailure = (err) => {
        console.error("Scan Failure:", err);
        setError(err.message || "Face Scan Failed");
    };

    return (
        <ECILayout activeStep="Face Enrollment">
            <div className="flex flex-col items-center justify-center min-h-[70vh] p-6 bg-gray-50">

                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Biometric Verification (Final)</h2>
                    <p className="text-gray-600">Secure AI-powered Identity Check</p>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-lg w-full max-w-lg">
                    {error && (
                        <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center">
                            {error}
                        </div>
                    )}

                    {/* 
                        Using the exact FaceScanner component.
                        mode="enroll" ensures it captures the first valid face and calls onEnroll.
                    */}
                    <FaceScanner
                        mode="enroll"
                        onEnroll={handleEnroll}
                        onScanFailure={handleScanFailure}
                    />
                </div>

                <div className="mt-8 flex gap-6">
                    <button
                        onClick={() => navigate('/captcha-details')}
                        className="px-6 py-3 bg-white text-gray-700 font-bold rounded-xl shadow-sm border border-gray-200 hover:bg-gray-50 hover:shadow-md transition-all"
                    >
                        Back
                    </button>
                </div>
            </div>
        </ECILayout>
    );
};

export default FaceEnrollment;
