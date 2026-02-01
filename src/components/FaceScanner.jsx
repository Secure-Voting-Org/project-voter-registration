import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import { loadModels, getFaceDescriptor, matchFaces } from '../services/faceAuth';

const FaceScanner = ({ onScanSuccess, onScanFailure, currentUser, onEnroll, mode = 'verify' }) => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [isModelLoaded, setIsModelLoaded] = useState(false);
    const [status, setStatus] = useState('Initializing Face ID...');

    useEffect(() => {
        const startFaceAuth = async () => {
            try {
                await loadModels();
                setIsModelLoaded(true);
                setStatus('Models loaded. Starting camera...');
                startVideo();
            } catch (err) {
                console.error(err);
                if (onScanFailure) onScanFailure(new Error('Failed to load AI models'));
            }
        };
        startFaceAuth();

        return () => {
            // Cleanup: Stop video tracks
            if (videoRef.current && videoRef.current.srcObject) {
                videoRef.current.srcObject.getTracks().forEach(track => track.stop());
            }
        }
    }, []);

    const startVideo = () => {
        navigator.mediaDevices.getUserMedia({ video: {} })
            .then(stream => {
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            })
            .catch(err => {
                console.error(err);
                setStatus('Error accessing camera');
                if (onScanFailure) onScanFailure(err);
            });
    };

    const handleVideoPlay = async () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;

        if (!video || !canvas) return;

        const displaySize = { width: video.width, height: video.height };
        faceapi.matchDimensions(canvas, displaySize);

        setStatus(mode === 'enroll' ? 'Scanning face for registration...' : 'Verifying identity...');

        const interval = setInterval(async () => {
            if (!videoRef.current || videoRef.current.paused || videoRef.current.ended) {
                clearInterval(interval);
                return;
            }

            try {
                // Detect face
                const detections = await faceapi.detectSingleFace(video)
                    .withFaceLandmarks()
                    .withFaceDescriptor();

                if (detections) {
                    const resizedDetections = faceapi.resizeResults(detections, displaySize);

                    // Clear previous drawings
                    const context = canvas.getContext('2d');
                    context.clearRect(0, 0, canvas.width, canvas.height);

                    // Draw box
                    faceapi.draw.drawDetections(canvas, resizedDetections);

                    // LOGIC BASED ON MODE
                    if (mode === 'enroll') {
                        // ENROLL MODE: Capture first good face
                        setStatus('Face Captured! Registering...');
                        clearInterval(interval);
                        // Stop video
                        video.srcObject.getTracks().forEach(track => track.stop());

                        // Convert Float32Array to regular array for JSON serialization
                        const descriptorArray = Array.from(detections.descriptor);
                        if (onEnroll) onEnroll(descriptorArray);

                    } else {
                        // VERIFY MODE
                        if (currentUser && currentUser.faceDescriptor) {
                            const match = matchFaces(detections.descriptor, currentUser.faceDescriptor);
                            if (match) {
                                setStatus('Face Verified!');
                                clearInterval(interval);
                                video.srcObject.getTracks().forEach(track => track.stop());
                                if (onScanSuccess) onScanSuccess();
                            } else {
                                setStatus('Face Does Not Match Records');
                            }
                        }
                    }
                }
            } catch (error) {
                console.error("Detection error:", error);
            }
        }, 500);
    };

    return (
        <div className="relative w-full max-w-lg mx-auto">
            <p className="text-center font-bold mb-2 text-indigo-600 animate-pulse">{status}</p>
            <div className="relative rounded-lg overflow-hidden shadow-xl border-4 border-indigo-200">
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    onPlay={handleVideoPlay}
                    width="480"
                    height="360"
                    className="w-full object-cover"
                />
                <canvas
                    ref={canvasRef}
                    className="absolute top-0 left-0"
                />
            </div>
        </div>
    );
};

export default FaceScanner;
