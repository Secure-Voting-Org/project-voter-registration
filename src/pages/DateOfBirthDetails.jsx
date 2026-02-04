import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegistration } from '../context/RegistrationContext';
import ECILayout from '../components/ECILayout';

const DateOfBirthDetails = () => {
    const navigate = useNavigate();
    const { formData, updateFormData } = useRegistration();

    const [dob, setDob] = useState(formData.dob || '');
    const [documentType, setDocumentType] = useState('proof'); // 'proof' or 'other'
    const [selectedDoc, setSelectedDoc] = useState('');
    const [otherDocSpec, setOtherDocSpec] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    return (
        <ECILayout activeStep="G">
            {/* Section Header */}
            <div className="bg-blue-100 border border-blue-200 p-3 rounded-t-sm mb-6">
                <h3 className="text-sm font-bold text-gray-800">G. Date of Birth details</h3>
            </div>

            <form className="space-y-6">
                {/* 7(a) Date of Birth */}
                <div className="space-y-2">
                    <label className="block text-sm font-bold text-gray-800">
                        7(a.)<br />Date of Birth <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="date"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        className="w-full md:w-1/3 border border-gray-300 rounded px-3 py-2 bg-gray-100 focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500 transition-colors"
                    />
                </div>

                {/* 7(b) Document Proof */}
                <div className="space-y-4">
                    <label className="block text-sm font-bold text-gray-800">
                        7(b.)Self attested copy of document supporting age proof attached
                    </label>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                        {/* Option 1: Standard Document */}
                        <div className="space-y-3">
                            <label className="flex items-start space-x-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="docType"
                                    value="proof"
                                    checked={documentType === 'proof'}
                                    onChange={() => setDocumentType('proof')}
                                    className="mt-1 w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                />
                                <span className="text-sm text-gray-700">Document for proof of Date of Birth</span>
                            </label>

                            <select
                                value={selectedDoc}
                                onChange={(e) => setSelectedDoc(e.target.value)}
                                disabled={documentType !== 'proof'}
                                className={`w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500 ${documentType !== 'proof' ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                <option value="">Select Document</option>
                                <option value="birth_certificate">Birth Certificate</option>
                                <option value="aadhaar">Aadhaar Card</option>
                                <option value="pan">PAN Card</option>
                                <option value="driving_license">Driving License</option>
                                <option value="passport">Passport</option>
                            </select>
                        </div>

                        {/* Option 2: Other Document */}
                        <div className="space-y-3">
                            <label className="flex items-start space-x-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="docType"
                                    value="other"
                                    checked={documentType === 'other'}
                                    onChange={() => setDocumentType('other')}
                                    className="mt-1 w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                />
                                <span className="text-sm text-gray-700">
                                    Any other Document for proof of Date of Birth (If no document is available) (Pl. Specify)
                                </span>
                            </label>

                            <input
                                type="text"
                                value={otherDocSpec}
                                onChange={(e) => setOtherDocSpec(e.target.value)}
                                disabled={documentType !== 'other'}
                                className={`w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500 ${documentType !== 'other' ? 'opacity-50 cursor-not-allowed' : ''}`}
                            />
                        </div>
                    </div>
                </div>

                {/* File Upload */}
                <div className="space-y-2 pt-2">
                    <label className="block text-sm font-bold text-gray-800 leading-relaxed">
                        Proof of Date of Birth (Document size maximum 2MB,.jpg,.png,.pdf) <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center">
                        <label className="flex items-center border border-gray-300 rounded bg-gray-100 px-3 py-1 cursor-pointer hover:bg-gray-200 transition-colors">
                            <span className="text-sm text-gray-700">Choose File</span>
                            <input
                                type="file"
                                accept=".jpg,.png,.pdf"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </label>
                        <span className="ml-3 text-sm text-gray-600">
                            {selectedFile ? selectedFile.name : 'No file chosen'}
                        </span>
                    </div>
                </div>

                <hr className="my-8 border-gray-200" />

                {/* Navigation Buttons */}
                <div className="flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={() => navigate('/gender-details')}
                        className="px-4 py-2 bg-white border border-gray-300 text-blue-500 font-medium text-sm rounded hover:bg-gray-50 flex items-center shadow-sm"
                    >
                        &uarr; Previous
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            updateFormData({ dob: dob });
                            navigate('/present-address-details');
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

export default DateOfBirthDetails;
