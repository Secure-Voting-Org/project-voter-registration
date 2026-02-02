import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ECILayout from '../components/ECILayout';

const DisabilityDetails = () => {
    const navigate = useNavigate();

    // Disability Category State
    const [categories, setCategories] = useState({
        locomotive: false,
        visual: false,
        deafDumb: false,
        other: false
    });
    const [otherSpecification, setOtherSpecification] = useState('');

    // Percentage
    const [percentage, setPercentage] = useState('');

    // Certificate State
    const [certificateAttached, setCertificateAttached] = useState(''); // 'yes' or 'no'
    const [selectedFile, setSelectedFile] = useState(null);

    const handleCategoryChange = (key) => {
        setCategories(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    return (
        <ECILayout activeStep="I">
            {/* Section Header */}
            <div className="bg-blue-100 border border-blue-200 p-3 rounded-t-sm mb-6">
                <h3 className="text-sm font-bold text-gray-800">I. Category of Disability, if any (Optional)</h3>
            </div>

            <form className="space-y-6">
                <div className="space-y-4">
                    <label className="block text-sm font-bold text-gray-800">
                        9. Category
                    </label>

                    {/* Checkboxes Row 1 */}
                    <div className="flex flex-wrap gap-12">
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={categories.locomotive}
                                onChange={() => handleCategoryChange('locomotive')}
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-700">Locomotive</span>
                        </label>

                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={categories.visual}
                                onChange={() => handleCategoryChange('visual')}
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-700">Visual</span>
                        </label>

                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={categories.deafDumb}
                                onChange={() => handleCategoryChange('deafDumb')}
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-700">Deaf & Dumb</span>
                        </label>
                    </div>

                    {/* Other Row */}
                    <div className="flex items-center gap-3 mt-4">
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={categories.other}
                                onChange={() => handleCategoryChange('other')}
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <span className="text-sm font-bold text-gray-800">Other</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Other Disability"
                            value={otherSpecification}
                            onChange={(e) => setOtherSpecification(e.target.value)}
                            disabled={!categories.other}
                            className={`border border-gray-300 rounded px-3 py-1 text-sm bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500 ${!categories.other ? 'opacity-60 cursor-not-allowed' : ''}`}
                        />
                    </div>

                    {/* Percentage */}
                    <div className="mt-4">
                        <label className="block text-sm font-bold text-gray-800 mb-1">
                            Percentage of<br />disability
                        </label>
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                value={percentage}
                                onChange={(e) => setPercentage(e.target.value)}
                                className="w-16 border border-gray-300 rounded px-2 py-1 bg-gray-100 text-center focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-800">%</span>
                        </div>
                    </div>
                </div>

                {/* Certificate Attached */}
                <div className="space-y-2">
                    <label className="block text-sm font-bold text-gray-800">
                        Certificate Attached
                    </label>
                    <div className="flex gap-12">
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="radio"
                                name="certificate"
                                value="yes"
                                checked={certificateAttached === 'yes'}
                                onChange={() => setCertificateAttached('yes')}
                                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-700">Yes</span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="radio"
                                name="certificate"
                                value="no"
                                checked={certificateAttached === 'no'}
                                onChange={() => setCertificateAttached('no')}
                                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-700">No</span>
                        </label>
                    </div>
                </div>

                {/* File Upload */}
                <div className="space-y-2 pt-2">
                    <label className="block text-sm font-bold text-gray-800 leading-relaxed">
                        Disability Certificate (Document size maximum 2MB,.jpg,.png,.pdf)
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
                        onClick={() => navigate('/present-address-details')}
                        className="px-4 py-2 bg-white border border-gray-300 text-blue-500 font-medium text-sm rounded hover:bg-gray-50 flex items-center shadow-sm"
                    >
                        &uarr; Previous
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/family-details')}
                        className="px-6 py-2 bg-blue-400 text-white font-medium text-sm rounded hover:bg-blue-500 shadow-sm transition-colors"
                    >
                        &darr; Next
                    </button>
                </div>
            </form>
        </ECILayout>
    );
};

export default DisabilityDetails;
