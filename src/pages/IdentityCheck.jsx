import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegistration } from '../context/RegistrationContext';
import ECILayout from '../components/ECILayout';

const IdentityCheck = () => {
    const navigate = useNavigate();
    const { formData, updateFormData } = useRegistration();

    // Initialize with context data
    const [constituencyType, setConstituencyType] = useState('assembly');
    const [selectedState, setSelectedState] = useState(formData.state || '');
    const [selectedDistrict, setSelectedDistrict] = useState(formData.district || '');
    const [selectedConstituency, setSelectedConstituency] = useState(formData.constituency || '');

    const handleNext = () => {
        updateFormData({
            state: selectedState,
            district: selectedDistrict,
            constituency: selectedConstituency
        });
        navigate('/personal-details');
    };

    return (
        <ECILayout activeStep="A">
            {/* Section A: Header */}
            <div className="bg-blue-50 border border-blue-100 p-3 rounded-t-sm mb-4">
                <h3 className="text-sm font-bold text-gray-800">A. Select State, District & Assembly/Parliamentary Constituency</h3>
            </div>

            <div className="mb-4 text-sm text-gray-700">
                <p>To,</p>
                <p>The Electoral Registration Officer,</p>
            </div>

            {/* Form Content */}
            <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* State */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                            State <span className="text-red-500">*</span>
                        </label>
                        <select
                            value={selectedState}
                            onChange={(e) => setSelectedState(e.target.value)}
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white">
                            <option value="">Select State</option>
                            <option value="Andhra Pradesh">Andhra Pradesh</option>
                            <option value="Telangana">Telangana</option>
                            <option value="Karnataka">Karnataka</option>
                        </select>
                    </div>

                    {/* District */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                            District
                        </label>
                        <select
                            value={selectedDistrict}
                            onChange={(e) => setSelectedDistrict(e.target.value)}
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white">
                            <option value="">Select District</option>
                            <option value="Chittoor">Chittoor</option>
                            <option value="Kadapa">Kadapa</option>
                            <option value="Guntur">Guntur</option>
                        </select>
                    </div>
                </div>

                {/* Assembly Constituency Selection */}
                <div className="mt-4">
                    <div className="flex items-center mb-2">
                        <input
                            type="radio"
                            id="assembly"
                            name="constituencyType"
                            checked={constituencyType === 'assembly'}
                            onChange={() => setConstituencyType('assembly')}
                            className="mr-2"
                        />
                        <label htmlFor="assembly" className="text-sm font-medium text-gray-700">
                            No. & Name of Assembly Constituency<span className="text-red-500">*</span>
                        </label>
                    </div>

                    <div className="flex gap-4 pl-6">
                        <div className="w-24">
                            <input
                                type="text"
                                placeholder="No."
                                disabled={constituencyType !== 'assembly'}
                                className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50"
                            />
                        </div>
                        <div className="flex-1">
                            <select
                                value={selectedConstituency}
                                onChange={(e) => setSelectedConstituency(e.target.value)}
                                className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white"
                            >
                                <option value="">Select AC</option>
                                <option value="Kuppam">Kuppam</option>
                                <option value="Pulivendula">Pulivendula</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="text-center text-sm text-gray-500 my-2">Or</div>

                {/* Parliamentary Constituency Selection */}
                <div>
                    <div className="flex items-center mb-2">
                        <input
                            type="radio"
                            id="parliamentary"
                            name="constituencyType"
                            checked={constituencyType === 'parliamentary'}
                            onChange={() => setConstituencyType('parliamentary')}
                            className="mr-2"
                        />
                        <label htmlFor="parliamentary" className="text-sm font-medium text-gray-700">
                            No. & Name of Parliamentary Constituency<span className="text-red-500">*</span>
                        </label>
                    </div>
                    <div className="ml-6 text-xs text-gray-500 mb-2">
                        (@Only for Union Territories not having Legislative Assembly)
                    </div>

                    <div className="flex gap-4 pl-6">
                        <div className="w-24">
                            <input
                                type="text"
                                placeholder="No."
                                disabled={constituencyType !== 'parliamentary'}
                                className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50"
                            />
                        </div>
                        <div className="flex-1">
                            <select
                                disabled={constituencyType !== 'parliamentary'}
                                className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white"
                            >
                                <option>Select PC</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Warning Text */}
                <div className="text-xs text-red-500 mt-6 font-medium">
                    ** Please enter the Name as per your Aadhaar Card and ensure the Mobile Number linked with Aadhaar is with you for submitting the form for OTP verification and eSign.
                </div>

                {/* Disclaimer */}
                <div className="text-xs text-gray-600 mt-2">
                    I submit application for inclusion of my name in the electoral roll for the above constituency.
                </div>

                <hr className="my-6 border-gray-200" />

                {/* Footer Buttons */}
                <div className="flex justify-end items-center pt-2">
                    <button
                        type="button"
                        onClick={handleNext}
                        className="px-6 py-2 bg-blue-400 text-white text-sm font-medium rounded hover:bg-blue-500 transition-colors"
                    >
                        Next &darr;
                    </button>
                </div>
            </form>
        </ECILayout >
    );
};

export default IdentityCheck;
