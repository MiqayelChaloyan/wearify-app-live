import axios from 'axios';

const url = 'https://izsxvz76txzz65daflqxv7bes40hqgcf.lambda-url.us-east-1.on.aws';

export const getGenaiData = async (user_id, cloth_id) => {
    try {
        const response = await axios.post(url, {
            user_id,
            cloth_id
        }, {
            timeout: 120000
        });

        return response.data;
        
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.code === 'ECONNABORTED') {
                console.error('Request timed out after 2 minutes');
                throw new Error('AI processing is taking longer than expected. Please try again or contact support if the issue persists.');
            } else if (error.response) {
                // Server responded with error status
                console.error('Server error:', error.response.status, error.response.data);
                throw new Error(`Server error: ${error.response.status} - ${error.response.data?.message || 'Unknown server error'}`);
            } else if (error.request) {
                // Request was made but no response received
                console.error('No response received:', error.request);
                throw new Error('No response from AI processing server. Please check your connection and try again.');
            }
        }
        
        throw new Error('An unexpected error occurred during AI processing. Please try again.');
    }
};