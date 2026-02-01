import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ECILayout from '../components/ECILayout';

const IdentityCheck = () => {
    const [aadhaar, setAadhaar] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleValidate = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (!/^\d{12}$/.test(aadhaar)) {
            setError('Aadhaar must be a 12-digit number');
            setLoading(false);
            return;
        }
        if (!/^\d{10}$/.test(phone)) {
            setError('Phone must be a 10-digit number');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/registration/validate', {
                aadhaar,
                phone
            });

            if (response.data.success) {
                navigate('/face-enroll', {
                    state: {
                        aadhaar,
                        name: response.data.name,
                        constituency: response.data.constituency
                    }
                });
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Validation failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ECILayout activeStep="A">
            {/* Section A: Header */}
            <div className="bg-blue-50 border border-blue-100 p-3 rounded-t-sm mb-4">
                <h3 className="text-sm font-bold text-gray-800">A. Identity Verification / पहचान सत्यापन</h3>
                <p className="text-xs text-gray-500 mt-1">Please enter your details as per Aadhaar Card. / कृपया आधार कार्ड के अनुसार अपना विवरण दर्ज करें।</p>
            </div>

            {/* Form Content */}
            <form onSubmit={handleValidate} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Aadhaar Input */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Aadhaar Number <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            maxLength="12"
                            value={aadhaar}
                            onChange={(e) => setAadhaar(e.target.value.replace(/\D/g, ''))}
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition-shadow bg-white"
                            placeholder="Enter 12-digit Aadhaar Number"
                        />
                        <p className="text-[10px] text-gray-400 mt-1">Unique Identification Number issued by UIDAI</p>
                    </div>

                    {/* Phone Input */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Mobile Number <span className="text-red-500">*</span>
                        </label>
                        <div className="flex">
                            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md">
                                +91
                            </span>
                            <input
                                type="text"
                                maxLength="10"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                                className="w-full border border-gray-300 rounded-r px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition-shadow bg-white"
                                placeholder="Enter 10-digit Mobile Number"
                            />
                        </div>
                        <p className="text-[10px] text-gray-400 mt-1">Number linked with Aadhaar is recommended</p>
                    </div>
                </div>

                {/* Error Box */}
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative text-sm" role="alert">
                        <strong className="font-bold">Error: </strong>
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}

                {/* Disclaimer Text */}
                <div className="text-xs text-gray-500 italic mt-4 bg-yellow-50 p-2 border border-yellow-100 rounded">
                    ** I submit application for inclusion of my name in the electoral roll for the above constituency. I declare that I am a citizen of India.
                </div>

                {/* Footer / Buttons */}
                <div className="flex justify-end gap-3 pt-6 border-t border-gray-100 mt-6">
                    <button
                        type="button"
                        onClick={() => setAadhaar('') || setPhone('')}
                        className="px-6 py-2 border border-gray-300 text-gray-700 font-medium text-sm rounded hover:bg-gray-50 transition-colors"
                    >
                        Clear
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`px-6 py-2 text-white font-medium text-sm rounded shadow-sm transition-all
                            ${loading
                                ? 'bg-blue-400 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700 hover:shadow-md'}`}
                    >
                        {loading ? 'Verifying...' : 'Next >'}
                    </button>
                </div>
            </form>
        </ECILayout>
    );
};

export default IdentityCheck;
