import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ECILayout from '../components/ECILayout';

const Declaration = () => {
    const navigate = useNavigate();

    // Declaration State
    const [village, setVillage] = useState('');
    const [state, setState] = useState('');
    const [district, setDistrict] = useState('');
    const [residenceDate, setResidenceDate] = useState('');
    const [place, setPlace] = useState('');
    const [date, setDate] = useState('01 | 02 | 2026'); // Pre-filled or current date

    return (
        <ECILayout activeStep="K">
            {/* Section Header K */}
            <div className="bg-blue-100 border border-blue-200 p-3 rounded-t-sm mb-6">
                <h3 className="text-sm font-bold text-gray-800">K. Declaration</h3>
            </div>

            <div className="space-y-6 text-sm text-gray-800">
                <p className="font-medium">I Hereby declare that to the best of My knowledge and belief.</p>

                {/* (i) Citizen Info */}
                <div className="space-y-3">
                    <p>(i) I am a citizen of India and place of my birth is</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-1">
                            <label className="block text-xs font-bold text-red-600">Village/Town *</label>
                            <input
                                type="text"
                                value={village}
                                onChange={(e) => setVillage(e.target.value)}
                                className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="block text-xs font-bold text-red-600">State/UT *</label>
                            <select
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            >
                                <option value="">Select State</option>
                                <option value="state1">Andhra Pradesh</option>
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label className="block text-xs font-bold">District</label>
                            <select
                                value={district}
                                onChange={(e) => setDistrict(e.target.value)}
                                className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            >
                                <option value="">Select District</option>
                                <option value="dist1">District 1</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* (ii) Residence Info */}
                <div className="flex flex-wrap items-center gap-2">
                    <p>(ii) I am ordinarily a resident at the address mentioned at Section 8(a) in Form 6 since <span className="text-red-600">*</span></p>
                    <input
                        type="month"
                        value={residenceDate}
                        onChange={(e) => setResidenceDate(e.target.value)}
                        className="border border-gray-300 rounded px-3 py-1 bg-gray-100 focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500"
                    />
                </div>

                {/* (iii) & (iv) Text */}
                <div className="space-y-3">
                    <p>(iii) I am applying for inclusion in Electoral Roll for the first time and my name is not included in any Assembly Constituency/Parliamentary Constituency.</p>
                    <p>(iv) I don't possess any of the mentioned documents for proof of Date of Birth/Age. Therefore, I have enclosed, below mentioned document in support of age proof. (Leave blank, if not applicable).</p>
                    <input
                        type="text"
                        className="w-full md:w-1/2 border border-gray-300 rounded px-3 py-2 bg-gray-100 focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500"
                    />
                </div>

                {/* (v) Warning & Signature */}
                <div className="space-y-4">
                    <p>(v) I am aware that making the above statement or declaration in relation to this application which is false and which I know or believe to be false or do not believe to be true, is punishable under Section 31 of Representation of the People Act,1950 (43 of 1950) with imprisonment for a term which may extend to one year or with fine or with both.</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1">
                            <label className="block text-sm font-bold text-red-600">Place *</label>
                            <input
                                type="text"
                                value={place}
                                onChange={(e) => setPlace(e.target.value)}
                                className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="block text-sm font-bold text-gray-800">Date</label>
                            <input
                                type="text"
                                value={date}
                                readOnly
                                className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-200 cursor-not-allowed"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <hr className="my-8 border-gray-200" />

            {/* Navigation Buttons */}
            <div className="flex justify-end gap-3">
                <button
                    type="button"
                    onClick={() => navigate('/family-details')}
                    className="px-4 py-2 bg-white border border-gray-300 text-blue-500 font-medium text-sm rounded hover:bg-gray-50 flex items-center shadow-sm"
                >
                    &uarr; Previous
                </button>
                <button
                    type="button"
                    onClick={() => navigate('/captcha-details')}
                    className="px-6 py-2 bg-blue-400 text-white font-medium text-sm rounded hover:bg-blue-500 shadow-sm transition-colors"
                >
                    &darr; Next
                </button>
            </div>

        </ECILayout>
    );
};

export default Declaration;
