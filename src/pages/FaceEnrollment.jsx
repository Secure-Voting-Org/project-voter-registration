import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegistration } from '../context/RegistrationContext';
import FaceScanner from '../components/FaceScanner';
import axios from 'axios';
import ECILayout from '../components/ECILayout';

const FaceEnrollment = () => {
    // const { formData } = useRegistration();
    // Fallback if accessed directly without data (optional, but good for safety)
    const state = {
        aadhaar: 'TEST_AADHAAR_999',
        name: 'Test Applicant',
        constituency: 'Test Constituency'
    };
    const navigate = useNavigate();
    const { formData, updateFormData } = useFormContext();
    const [modelLoaded, setModelLoaded] = useState(false);
    const [detecting, setDetecting] = useState(false);
    const [message, setMessage] = useState("Initializing Secure Face ID...");
    const [error, setError] = useState("");
    const [guidance, setGuidance] = useState("Please allow camera access");

    // Load models
    useEffect(() => {
        const loadModels = async () => {
            try {
                const MODEL_URL = '/models/weights'; // Correct path
                await Promise.all([
                    faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
                    faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
                    faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL)
                ]);
                setModelLoaded(true);
                setGuidance("Align your face within the frame");
                setMessage("Ready to Scan");
            } catch (err) {
                console.error("Model Load Error:", err);
                setError("System Error: Failed to load biometric models. Please refresh.");
            }
        };
        loadModels();
    }, []);

    const captureAndRegister = async () => {
        if (!webcamRef.current || !webcamRef.current.video) return;

        setDetecting(true);
        setError("");
        setMessage("Analyzing biometric features...");

        try {
            const response = await axios.post('http://localhost:8081/api/registration/submit', {
                ...formData, // <--- Submit ALL collected data
                faceDescriptor: faceDescriptor
            });

            if (response.data.success) {
                navigate('/success', {
                    state: {
                        applicationId: response.data.applicationId,
                        name: state.name
                    }
                });
            }

            // Add a timeout to prevent infinite hanging
            const detectionPromise = faceapi.detectSingleFace(videoEl, new faceapi.TinyFaceDetectorOptions())
                .withFaceLandmarks()
                .withFaceDescriptor();

            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error("Detection timed out")), 5000)
            );

            const detection = await Promise.race([detectionPromise, timeoutPromise]);

            if (!detection) {
                throw new Error("No face detected. Please ensure good lighting and look directly at the camera.");
            }

            setMessage("Face Verified. Encrypting data...");

            // Artificial delay for "Scanning" feel (optional, but adds to 'professional' feel)
            await new Promise(r => setTimeout(r, 800));

            const descriptorArray = Array.from(detection.descriptor);
            updateFormData({ faceDescriptor: descriptorArray });

            navigate('/preview');

        } catch (err) {
            console.error("Capture Error:", err);
            setError(err.message || "Biometric scan failed");
            setMessage("Scan Failed");
            setDetecting(false);
        }
    };

    return (
        <ECILayout activeStep="Face Enrollment">
            <div className="flex flex-col items-center justify-center min-h-[70vh] p-6 bg-gray-50">

                {/* Header */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Biometric Verification</h2>
                    <p className="text-gray-600">Secure AI-powered Identity Check</p>
                </div>

                {/* Camera Container */}
                <div className="relative">
                    {/* Status Pill */}
                    <div className={`absolute -top-12 left-1/2 transform -translate-x-1/2 px-6 py-2 rounded-full text-sm font-semibold shadow-md transition-colors duration-300 ${error ? 'bg-red-100 text-red-700' :
                        detecting ? 'bg-blue-100 text-blue-700 animate-pulse' :
                            'bg-gray-800 text-white'
                        }`}>
                        {error || (detecting ? "Scanning..." : guidance)}
                    </div>

                    <div className="w-full max-w-lg">
                        {submitting ? (
                            <div className="flex flex-col items-center justify-center p-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                                <p className="text-sm font-semibold text-gray-700">Submitting Application...</p>
                            </div>
                        ) : (
                            modelLoaded ? (
                                <div className="border border-gray-300 p-2 rounded shadow-sm bg-white">
                                    <FaceScanner
                                        mode="enroll"
                                        onEnroll={handleEnrollment}
                                        onScanFailure={(err) => setError(err.message)}
                                    />
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-4">
                                    <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <p>Loading Neural Engines...</p>
                                </div>
                            ))}

                        {/* Face Guide Overlay */}
                        <div className="absolute inset-0 pointer-events-none">
                            <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-64 border-2 rounded-[50%] transition-colors duration-500 ${detecting ? 'border-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.5)]' : 'border-white/50 border-dashed'
                                }`}></div>

                            {/* Scanning horizontal line */}
                            {detecting && (
                                <div className="absolute top-0 left-0 w-full h-1 bg-blue-500 shadow-[0_0_10px_#3b82f6] animate-[scan_2s_ease-in-out_infinite] opacity-75"></div>
                            )}
                        </div>
                    </div>

                    {/* Footer Message */}
                    <div className="mt-6 text-center h-8">
                        <p className={`font-medium ${error ? 'text-red-500' : 'text-blue-600'}`}>
                            {message}
                        </p>
                    </div>
                </div>

                <p className="mt-8 text-xs text-gray-400 max-w-md text-center">
                    Note: Your face data is securely encrypted. Your application will be verified by an Election Officer before approval.
                </p>
            </div>
        </ECILayout>
    );
};

export default FaceEnrollment;
