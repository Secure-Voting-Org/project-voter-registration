import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegistration } from '../context/RegistrationContext';
import ECILayout from '../components/ECILayout';

const ContactDetails = () => {
    const navigate = useNavigate();

    // State for Mobile
    const [mobileSelf, setMobileSelf] = useState(false);
    const [mobileRelative, setMobileRelative] = useState(false);
    const [mobileNumber, setMobileNumber] = useState('');

    // State for Email
    const [emailSelf, setEmailSelf] = useState(false);
    const [emailRelative, setEmailRelative] = useState(false);
    const [emailId, setEmailId] = useState('');

    const handleMobileCheck = (type) => {
        if (type === 'self') {
            setMobileSelf(!mobileSelf);
            if (!mobileSelf) setMobileRelative(false);
        } else {
            setMobileRelative(!mobileRelative);
            if (!mobileRelative) setMobileSelf(false);
        }
    };

    const handleEmailCheck = (type) => {
        if (type === 'self') {
            setEmailSelf(!emailSelf);
            if (!emailSelf) setEmailRelative(false);
        } else {
            setEmailRelative(!emailRelative);
            if (!emailRelative) setEmailSelf(false);
        }
    };

    return (
        <ECILayout activeStep="D">
            {/* Section Header */}
            <div className="bg-blue-100 border border-blue-200 p-3 rounded-t-sm mb-6">
                <h3 className="text-sm font-bold text-gray-800">D. Contact Details</h3>
            </div>

            <form className="space-y-8">
                {/* 3. Mobile Number */}
                <div className="space-y-4">
                    <label className="block text-sm font-bold text-gray-800">
                        3. Mobile Number
                    </label>
                    <div className="flex gap-12 mb-3">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={mobileSelf}
                                onChange={() => handleMobileCheck('self')}
                                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                            <span className="text-sm text-gray-700">Self</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={mobileRelative}
                                onChange={() => handleMobileCheck('relative')}
                                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                            <span className="text-sm text-gray-700">Relative mentioned above</span>
                        </label>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Mobile Number of the above selected
                        </label>
                        <div className="flex max-w-md">
                            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
                                +91
                            </span>
                            <input
                                type="text"
                                value={mobileNumber}
                                onChange={(e) => setMobileNumber(e.target.value)}
                                className="w-full border border-gray-300 rounded-r px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-gray-100 focus:bg-white transition-colors"
                            />
                        </div>
                    </div>
                </div>

                {/* 4. Email Id */}
                <div className="space-y-4">
                    <label className="block text-sm font-bold text-gray-800">
                        4. Email Id
                    </label>
                    <div className="flex gap-12 mb-3">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={emailSelf}
                                onChange={() => handleEmailCheck('self')}
                                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                            <span className="text-sm text-gray-700">Self</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={emailRelative}
                                onChange={() => handleEmailCheck('relative')}
                                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                            <span className="text-sm text-gray-700">Relative mentioned above</span>
                        </label>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Email ID of the above selected
                        </label>
                        <div className="max-w-md">
                            <input
                                type="email"
                                value={emailId}
                                onChange={(e) => setEmailId(e.target.value)}
                                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-gray-100 focus:bg-white transition-colors"
                            />
                        </div>
                    </div>
                </div>

                <hr className="my-8 border-gray-200" />

                {/* Navigation Buttons */}
                <div className="flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={() => navigate('/relatives-details')}
                        className="px-4 py-2 bg-white border border-gray-300 text-blue-500 font-medium text-sm rounded hover:bg-gray-50 flex items-center shadow-sm"
                    >
                        &uarr; Previous
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            updateFormData({ mobile: mobileNumber, email: emailId });
                            navigate('/aadhaar-details');
                        }}
                        className="px-6 py-2 bg-blue-400 text-white font-medium text-sm rounded hover:bg-blue-500 shadow-sm transition-colors"
                    >
                        &darr; Next
                    </button>
                </div>
            </form>
        </ECILayout>
    );
};

export default ContactDetails;
