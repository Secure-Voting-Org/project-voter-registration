import { useNavigate } from 'react-router-dom';

const ECILayout = ({ children, activeStep = 'A' }) => {
    const navigate = useNavigate();

    const steps = [
        { id: 'A', label: 'A. Select State, District & AC', path: '/identity' },
        { id: 'B', label: 'B. Personal Details', path: '/personal-details' },
        { id: 'C', label: 'C. Relatives Details', path: '/relatives-details' },
        { id: 'D', label: 'D. Contact Details', path: '/contact-details' },
        { id: 'E', label: 'E. Aadhaar Details', path: '/aadhaar-details' },
        { id: 'F', label: 'F. Gender', path: '/gender-details' },
        { id: 'G', label: 'G. Date of Birth details', path: '/dob-details' },
        { id: 'H', label: 'H. Present Address Details', path: '/present-address-details' },
        { id: 'I', label: 'I. Disability Details', path: '/disability-details' },
        { id: 'J', label: 'J. Family member Details', path: '/family-details' },
        { id: 'K', label: 'K. Declaration', path: '/declaration' },
        { id: 'L', label: 'L. Captcha', path: '/captcha-details' },
    ];

    return (
        <div className="min-h-screen bg-gray-100 font-sans text-sm">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="container mx-auto px-4 py-2 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        {/* ECI Logo Placeholder */}
                        <div className="w-10 h-10 bg-gradient-to-r from-orange-500 via-white to-green-500 rounded-full flex items-center justify-center border border-gray-300 shadow-sm">
                            <span className="font-bold text-xs text-gray-700">ECI</span>
                        </div>
                        <div>
                            <h1 className="text-lg font-bold text-purple-900 leading-tight">ECINet</h1>
                            <p className="text-xs text-purple-700 font-semibold tracking-wide">VOTERS' SERVICE PORTAL</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="flex items-center bg-gray-100 rounded px-2 py-1 cursor-pointer hover:bg-gray-200">
                            <span className="text-gray-600 font-medium">English</span>
                            <svg className="w-4 h-4 ml-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>

                    </div>
                </div>
                {/* Purple Bar */}
                <div className="h-1 bg-purple-700 w-full"></div>
            </header>

            <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row gap-6">
                {/* Sidebar Navigation */}
                <aside className="w-full md:w-64 flex-shrink-0">
                    <div className="bg-white rounded shadow-sm border border-gray-200 overflow-hidden">
                        <div className="p-3 bg-gray-50 border-b border-gray-200 font-bold text-gray-700">
                            Form Particulars
                            <div className="text-xs font-normal text-gray-500 mt-1">Click section to jump</div>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {steps.map((step) => (
                                <button
                                    key={step.id}
                                    onClick={() => navigate(step.path)}
                                    className={`w-full text-left px-4 py-3 text-xs font-medium transition-colors duration-200 flex items-center
                                        ${activeStep === step.id
                                            ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500'
                                            : 'text-gray-600 hover:bg-gray-50 border-l-4 border-transparent'}`}
                                >
                                    {step.label}
                                </button>
                            ))}
                        </div>

                        {/* Global Action Buttons in Sidebar */}
                        <div className="p-4 bg-gray-50 border-t border-gray-200 space-y-3">
                            <button className="w-full px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded hover:bg-blue-600 shadow-sm transition-colors">
                                Preview and Submit
                            </button>
                            <button className="w-full px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded hover:bg-gray-50 shadow-sm transition-colors">
                                Save
                            </button>
                            <button className="w-full px-4 py-2 bg-white border border-blue-500 text-blue-500 text-sm font-medium rounded hover:bg-blue-50 shadow-sm transition-colors">
                                Cancel
                            </button>
                        </div>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1">
                    <div className="bg-white rounded shadow-sm border border-gray-200 p-6 min-h-[600px]">
                        <div className="flex justify-between items-start mb-6 border-b border-gray-100 pb-4">
                            <div>
                                <h2 className="text-xl font-bold text-gray-800">Form 6</h2>
                                <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">(See Rules 13(1) and 26)</p>
                                <p className="text-sm font-semibold text-gray-700 mt-1">ELECTION COMMISSION OF INDIA</p>
                                <p className="text-sm text-gray-600">Application Form for New Voters</p>
                            </div>
                        </div>

                        {children}
                    </div>
                </main>
            </div >
        </div >
    );
};

export default ECILayout;
