import * as faceapi from 'face-api.js';

// Load models
export const loadModels = async () => {
    const MODEL_URL = '/models/weights'; // Correct path based on public/models/weights
    await Promise.all([
        faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL)
    ]);
};

// Get face descriptor from an image (HTMLImageElement as input)
export const getFaceDescriptor = async (imageElement) => {
    const detection = await faceapi.detectSingleFace(imageElement)
        .withFaceLandmarks()
        .withFaceDescriptor();

    if (!detection) {
        throw new Error('No face detected');
    }

    return detection.descriptor;
};

// Compare two descriptors (Useful for verify mode, but we mostly enroll here)
export const matchFaces = (descriptor1, descriptor2) => {
    const distance = faceapi.euclideanDistance(descriptor1, descriptor2);
    // Threshold usually 0.6. Using 0.5 (Strict).
    return distance < 0.5;
};
