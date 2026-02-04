import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegistration } from '../context/RegistrationContext';
import FaceScanner from '../components/FaceScanner';
import axios from 'axios';
import ECILayout from '../components/ECILayout';

const FaceEnrollment = () => {
    const { formData } = useRegistration();
    // Fallback if accessed directly without data (optional, but good for safety)
    const state = {
        aadhaar: formData.aadhaar || 'TEST_AADHAAR_999',
        name: formData.name || 'Test Applicant',
        constituency: formData.constituency || 'Test Constituency'
    };
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleEnrollment = async (faceDescriptor) => {
        setSubmitting(true);
        setError('');

        try {
            const response = await axios.post('http://localhost:5000/api/registration/submit', {
                ...formData, // <--- Submit ALL collected data
                faceDescriptor: faceDescriptor
            });

            if (response.data.success) {
                navigate('/success', {
                    state: {
                        applicationId: response.data.applicationId,
                        name: state.name
                    }
                });
            }
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.error || 'Registration failed. Please try scanning again.');
            setSubmitting(false); // Allow retry
        }
    };

    // if (!state) return <div className="p-10 text-center">Unauthorized Access. <a href="/" className="text-blue-600">Go Home</a></div>;

    return (
        <ECILayout activeStep="M">
            {/* Section Header */}
            <div className="bg-blue-50 border border-blue-100 p-3 rounded-t-sm mb-4">
                <h3 className="text-sm font-bold text-gray-800">M. Face Registration / चेहरा पंजीकरण</h3>
                <p className="text-xs text-gray-500 mt-1">Final step: Biometric verification required for voter card generation.</p>
            </div>

            <div className="flex flex-col items-center py-6">
                <h2 className="text-xl font-bold text-gray-800 mb-2">Biometric Enrollment</h2>
                <div className="bg-yellow-50 text-yellow-800 text-sm px-4 py-2 rounded mb-6 border border-yellow-200">
                    <strong>Applicant:</strong> {state.name} | <strong>Constituency:</strong> {state.constituency}
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-2 rounded w-full max-w-md mb-4 border border-red-200 text-sm text-center">
                        {error}
                    </div>
                )}

                <div className="w-full max-w-lg">
                    {submitting ? (
                        <div className="flex flex-col items-center justify-center p-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                            <p className="text-sm font-semibold text-gray-700">Submitting Application...</p>
                        </div>
                    ) : (
                        <div className="border border-gray-300 p-2 rounded shadow-sm bg-white">
                            <FaceScanner
                                mode="enroll"
                                onEnroll={handleEnrollment}
                                onScanFailure={(err) => setError(err.message)}
                            />
                        </div>
                    )}
                </div>

                <p className="mt-8 text-xs text-gray-400 max-w-md text-center">
                    Note: Your face data is securely encrypted. Your application will be verified by an Election Officer before approval.
                </p>
            </div>
        </ECILayout>
    );
};

export default FaceEnrollment;
