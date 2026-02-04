import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import * as faceapi from 'face-api.js';
import { useFormContext } from '../context/FormContext';
import ECILayout from '../components/ECILayout';

const FaceEnrollment = () => {
    const webcamRef = useRef(null);
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
            const videoEl = webcamRef.current.video;

            if (videoEl.readyState !== 4) {
                throw new Error("Camera stream unstable");
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

                    <div className="relative border-4 border-gray-900 rounded-2xl overflow-hidden shadow-2xl w-[400px] h-[300px] bg-black">
                        {modelLoaded ? (
                            <Webcam
                                audio={false}
                                ref={webcamRef}
                                screenshotFormat="image/jpeg"
                                className="w-full h-full object-cover transform scale-x-[-1]" // Mirror effect
                                videoConstraints={{ facingMode: "user" }}
                                onUserMediaError={() => setError("Camera access denied")}
                            />
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-4">
                                <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <p>Loading Neural Engines...</p>
                            </div>
                        )}

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

                {/* Controls */}
                <div className="mt-8 flex gap-6">
                    <button
                        onClick={() => navigate('/captcha-details')}
                        className="px-6 py-3 bg-white text-gray-700 font-bold rounded-xl shadow-sm border border-gray-200 hover:bg-gray-50 hover:shadow-md transition-all"
                    >
                        Back
                    </button>
                    <button
                        onClick={captureAndRegister}
                        disabled={!modelLoaded || detecting}
                        className={`flex items-center gap-2 px-10 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all text-lg ${(!modelLoaded || detecting) ? 'opacity-50 cursor-not-allowed grayscale' : ''
                            }`}
                    >
                        {detecting ? (
                            <>Processing...</>
                        ) : (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                                </svg>
                                Perform Scan
                            </>
                        )}
                    </button>
                </div>

                {/* CSS Animation for Scanner */}
                <style>{`
                    @keyframes scan {
                        0% { top: 10%; opacity: 0; }
                        50% { opacity: 1; }
                        100% { top: 90%; opacity: 0; }
                    }
                `}</style>
            </div>
        </ECILayout>
    );
};

export default FaceEnrollment;
