const API_URL = 'http://localhost:8081/api/voter';

export const authService = {
    login: async (mobile, password) => {
        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mobile, password })
            });
            const data = await response.json();
            return data;
        } catch (error) {
            return { success: false, error: 'Network error' };
        }
    },

    register: async (fullName, mobile, password, email) => {
        try {
            const response = await fetch(`${API_URL}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                // Sending email as optional field
                body: JSON.stringify({ fullName, mobile, password, email })
            });
            const data = await response.json();
            return data;
        } catch (error) {
            return { success: false, error: 'Network error' };
        }
    },

    // Forgot Password Methods
    sendOtp: async (email) => {
        try {
            const response = await fetch(`${API_URL}/forgot-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            return await response.json();
        } catch (error) {
            return { success: false, error: 'Network error' };
        }
    },

    verifyOtp: async (email, otp) => {
        try {
            const response = await fetch(`${API_URL}/verify-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp })
            });
            return await response.json();
        } catch (error) {
            return { success: false, error: 'Network error' };
        }
    },

    resetPassword: async (email, newPassword) => {
        try {
            const response = await fetch(`${API_URL}/reset-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, newPassword })
            });
            return await response.json();
        } catch (error) {
            return { success: false, error: 'Network error' };
        }
    }
};
