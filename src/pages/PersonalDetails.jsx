import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegistration } from '../context/RegistrationContext';
import ECILayout from '../components/ECILayout';

const PersonalDetails = () => {
    const navigate = useNavigate();
    const { formData, updateFormData } = useRegistration();

    // Form Local State (initialized from context)
    const [firstName, setFirstName] = useState(formData.name ? formData.name.split(' ')[0] : '');
    const [surname, setSurname] = useState(formData.name && formData.name.split(' ').length > 1 ? formData.name.split(' ').slice(1).join(' ') : '');

    const handleNext = () => {
        const fullName = `${firstName} ${surname}`.trim();
        updateFormData({ name: fullName });
        navigate('/relatives-details');
    };

    // File Upload State
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    return (
        <ECILayout activeStep="B">
            {/* Section Header */}
            <div className="bg-blue-100 border border-blue-200 p-3 rounded-t-sm mb-6">
                <h3 className="text-sm font-bold text-gray-800">B. Personal Details</h3>
            </div>

            <form className="space-y-8">
                {/* Names Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* First Name */}
                    <div className="space-y-3">
                        <label className="block text-sm font-bold text-gray-800">
                            1. First Name followed by Middle Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500 transition-colors"
                        />
                        <div className="relative">
                            <input
                                type="text"
                                disabled
                                className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
                            />
                            <div className="absolute right-3 top-2.5 text-gray-500">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>
                            </div>
                        </div>
                    </div>

                    {/* Surname */}
                    <div className="space-y-3">
                        <label className="block text-sm font-bold text-gray-800">
                            Surname (if any)
                        </label>
                        <input
                            type="text"
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                            className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500 transition-colors"
                        />
                        <div className="relative">
                            <input
                                type="text"
                                disabled
                                className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
                            />
                            <div className="absolute right-3 top-2.5 text-gray-500">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Photo Upload Section */}
                <div className="space-y-2">
                    <label className="block text-sm font-bold text-gray-800 leading-relaxed">
                        Upload Photograph (Unsigned and Passport size color photograph(4.5 cm X 3.5 cm) showing front view of full face with white background.)<br />
                        (Document size maximum 2MB,.jpg,.jpeg) <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center">
                        <label className="flex items-center border border-gray-300 rounded bg-gray-100 px-3 py-1 cursor-pointer hover:bg-gray-200 transition-colors">
                            <span className="text-sm text-gray-700">Choose File</span>
                            <input
                                type="file"
                                accept=".jpg,.jpeg"
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
                <div className="flex flex-col md:flex-row justify-end items-center gap-4 mt-8">
                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={() => navigate('/identity')}
                            className="px-4 py-2 bg-white border border-gray-300 text-blue-500 font-medium text-sm rounded hover:bg-gray-50 flex items-center shadow-sm"
                        >
                            &uarr; Previous
                        </button>
                        <button
                            type="button"
                            onClick={handleNext}
                            className="px-6 py-2 bg-blue-400 text-white font-medium text-sm rounded hover:bg-blue-500 shadow-sm transition-colors"
                        >
                            Next &darr;
                        </button>
                    </div>
                </div>
            </form>
        </ECILayout>
    );
};

export default PersonalDetails;
