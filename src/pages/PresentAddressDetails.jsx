import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegistration } from '../context/RegistrationContext';
import ECILayout from '../components/ECILayout';

const PresentAddressDetails = () => {
    const navigate = useNavigate();
    const { formData, updateFormData } = useRegistration();

    // Address State (parse from single address string or keep separate if needed - assuming simple string for now or individual fields if context supports it)
    // For now, let's just store individual fields in context or a big address object.
    // Let's assume we store the "address" as a concatenated string for the backend, but we can store components here if we want better UX.
    // But since backend expects 'address', we'll reconstruct it.

    // BETTER: Let's assume we just save the full address string to context 'address' for now, 
    // OR, better, let's keep local state and save the formatted address on "Next".
    const [addressData, setAddressData] = useState({
        houseNo: '',
        streetClass: '',
        village: '',
        postOffice: '',
        pinCode: '',
        tehsil: '',
        district: formData.district || '',
        state: formData.state || ''
    });

    // Document State
    const [documentType, setDocumentType] = useState('proof'); // 'proof' or 'other'
    const [selectedDoc, setSelectedDoc] = useState('');
    const [otherDocSpec, setOtherDocSpec] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);

    const handleInputChange = (field, value) => {
        setAddressData(prev => ({ ...prev, [field]: value }));
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const TransliterationInput = ({ label, value, onChange, required = false }) => (
        <div className="space-y-3">
            <label className="block text-sm font-bold text-gray-800">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
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
    );

    return (
        <ECILayout activeStep="H">
            {/* Section Header */}
            <div className="bg-blue-100 border border-blue-200 p-3 rounded-t-sm mb-6">
                <h3 className="text-sm font-bold text-gray-800">H. Present Address Details</h3>
            </div>

            <form className="space-y-8">
                <div>
                    <h4 className="text-sm font-bold text-gray-800 mb-4">8(a.) Present Ordinary Residence (Full Address)</h4>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <TransliterationInput
                            label="House/Building/ Apartment No"
                            value={addressData.houseNo}
                            onChange={(val) => handleInputChange('houseNo', val)}
                            required
                        />
                        <TransliterationInput
                            label="Street/Area/Locality/Mohalla/Road"
                            value={addressData.streetClass}
                            onChange={(val) => handleInputChange('streetClass', val)}
                            required
                        />
                        <TransliterationInput
                            label="Village/Town"
                            value={addressData.village}
                            onChange={(val) => handleInputChange('village', val)}
                            required
                        />

                        <TransliterationInput
                            label="Post Office"
                            value={addressData.postOffice}
                            onChange={(val) => handleInputChange('postOffice', val)}
                            required
                        />

                        {/* PIN Code - No transliteration */}
                        <div className="space-y-3">
                            <label className="block text-sm font-bold text-gray-800">
                                PIN Code <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={addressData.pinCode}
                                onChange={(e) => handleInputChange('pinCode', e.target.value)}
                                className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500 transition-colors"
                            />
                            {/* Empty div to align grid if needed, or just leave as single input */}
                        </div>

                        <TransliterationInput
                            label="Tehsil/Taluqa/Mandal"
                            value={addressData.tehsil}
                            onChange={(val) => handleInputChange('tehsil', val)}
                            required
                        />
                    </div>

                    {/* District & State Dropdowns */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-gray-800">
                                District <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={addressData.district}
                                onChange={(e) => handleInputChange('district', e.target.value)}
                                className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            >
                                <option value="">Select District</option>
                                <option value="dist1">District 1</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-gray-800">
                                State/UT <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={addressData.state}
                                onChange={(e) => handleInputChange('state', e.target.value)}
                                className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            >
                                <option value="">Select State</option>
                                <option value="state1">Andhra Pradesh</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* 8(b) Address Proof Section */}
                <div className="space-y-4">
                    <label className="block text-sm font-bold text-gray-800 leading-relaxed">
                        8(b.) Self-attested copy of address proof either in the name of applicant or any one of parents/spouse/adult child, if already enrolled as elector at the same address<br />
                        (Attach anyone of them)
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
                                <span className="text-sm text-gray-700">Document for Proof of Residence</span>
                            </label>

                            <select
                                value={selectedDoc}
                                onChange={(e) => setSelectedDoc(e.target.value)}
                                disabled={documentType !== 'proof'}
                                className={`w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500 ${documentType !== 'proof' ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                <option value="">Select Document</option>
                                <option value="aadhaar">Aadhaar Card</option>
                                <option value="passport">Passport</option>
                                <option value="water_bill">Water Bill</option>
                                <option value="electricity_bill">Electricity Bill</option>
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
                                    Any other document for Proof of Residence (If no document is available) (Pl. Specify)
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
                        Proof of Residence (Document size maximum 2MB,.jpg,.png,.pdf) <span className="text-red-500">*</span>
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
                        onClick={() => navigate('/dob-details')}
                        className="px-4 py-2 bg-white border border-gray-300 text-blue-500 font-medium text-sm rounded hover:bg-gray-50 flex items-center shadow-sm"
                    >
                        &uarr; Previous
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            // Construct full address string
                            const fullAddress = `${addressData.houseNo}, ${addressData.streetClass}, ${addressData.village}, ${addressData.postOffice}, PIN: ${addressData.pinCode}, ${addressData.tehsil}, ${addressData.district}, ${addressData.state}`;
                            updateFormData({ address: fullAddress });
                            navigate('/disability-details');
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

export default PresentAddressDetails;
