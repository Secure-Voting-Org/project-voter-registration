import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const TrackStatus = () => {
    const navigate = useNavigate();
    const [referenceId, setReferenceId] = React.useState('');
    const [statusResult, setStatusResult] = React.useState(null);
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    // Dynamic import to avoid top-level axios dependency if not installed in this file scope (though typically it is)
    // Assuming axios is available
    const [axios, setAxios] = React.useState(null);

    React.useEffect(() => {
        import('axios').then(module => setAxios(module.default));
    }, []);

    const handleTrack = async () => {
        if (!referenceId) return;
        if (!axios) return;

        setLoading(true);
        setError('');
        setStatusResult(null);

        try {
            const response = await axios.get(`http://localhost:5001/api/application/status/${referenceId}`);
            if (response.data.success) {
                setStatusResult(response.data);
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to fetch status. Check Reference ID.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <Header />

            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                <div className="bg-white p-8 rounded-2xl shadow-md max-w-md w-full">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Track Application Status</h2>
                    <p className="text-gray-500 mb-6">Enter your Reference ID to check the current status of your application.</p>

                    <input
                        type="text"
                        placeholder="Enter Reference ID"
                        value={referenceId}
                        onChange={(e) => setReferenceId(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 mb-4 focus:ring-2 focus:ring-purple-500 outline-none"
                    />

                    <button
                        onClick={handleTrack}
                        disabled={loading}
                        className="w-full bg-purple-600 text-white py-3 rounded-lg font-bold hover:bg-purple-700 transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Checking...' : 'Track Status'}
                    </button>

                    {error && (
                        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded text-sm">
                            {error}
                        </div>
                    )}

                    {statusResult && (
                        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg text-left">
                            <h4 className="font-bold text-green-800 mb-2">Application Found</h4>
                            <div className="text-sm text-gray-700 space-y-1">
                                <p><span className="font-semibold">Name:</span> {statusResult.name}</p>
                                <p><span className="font-semibold">Constituency:</span> {statusResult.constituency}</p>
                                <p className="mt-2">
                                    <span className="font-semibold">Status: </span>
                                    <span className={`font-bold ${statusResult.status === 'APPROVED' ? 'text-green-600' : statusResult.status === 'REJECTED' ? 'text-red-600' : 'text-yellow-600'}`}>
                                        {statusResult.status}
                                    </span>
                                </p>
                            </div>
                        </div>
                    )}

                    <button
                        onClick={() => navigate('/dashboard')}
                        className="mt-6 text-sm text-gray-500 hover:text-gray-700 hover:underline block w-full"
                    >
                        Back to Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TrackStatus;
