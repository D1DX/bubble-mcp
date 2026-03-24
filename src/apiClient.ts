import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const RAW_URL = process.env.BUBBLE_API_URL || process.env.BUBBLE_BASE_URL;
const API_TOKEN = process.env.BUBBLE_API_TOKEN;

if (!RAW_URL) {
    throw new Error('BUBBLE_API_URL or BUBBLE_BASE_URL is not configured');
}

// Normalize: always end with /api/1.1
const API_URL = RAW_URL.replace(/\/+$/, '').replace(/\/api\/1\.1$/, '') + '/api/1.1';

if (!API_TOKEN) {
    throw new Error('BUBBLE_API_TOKEN is not configured');
}

// Validate URL format
try {
    new URL(API_URL);
} catch (e) {
    throw new Error(`Invalid BUBBLE_API_URL: ${API_URL}`);
}

// Initialize Axios instance
const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json'
    },
    validateStatus: status => status < 500
});

// Add response interceptor for better error handling
apiClient.interceptors.response.use(
    response => response,
    error => {
        console.error('API Error:', {
            url: error.config?.url,
            method: error.config?.method,
            status: error.response?.status,
            data: error.response?.data
        });
        throw error;
    }
);

export async function fetchSchema() {
    try {
        const response = await apiClient.get('/meta');
        console.log('Schema:', response.data);
        return response.data;
    }
    catch (error) {
        console.error('Error fetching schema:', error);
        throw error;
    }
}

export default apiClient;

//# sourceMappingURL=apiClient.js.map