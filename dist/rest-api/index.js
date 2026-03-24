#!/usr/bin/env node
import { config } from 'dotenv';
import axios from 'axios';
import { BubbleService } from '../bubbleService.js';
import { createServer } from './server.js';
// Load environment variables
config();
const BUBBLE_API_URL = process.env.BUBBLE_API_URL || process.env.BUBBLE_BASE_URL;
const BUBBLE_API_TOKEN = process.env.BUBBLE_API_TOKEN;
const PORT = process.env.API_PORT || process.env.PORT || 3000;
if (!BUBBLE_API_URL || !BUBBLE_API_TOKEN) {
    console.error('❌ Missing required environment variables:');
    console.error('   - BUBBLE_API_URL or BUBBLE_BASE_URL');
    console.error('   - BUBBLE_API_TOKEN');
    process.exit(1);
}
console.log('🔧 Initializing Bubble service...');
// Create axios instance configured for Bubble API
const apiClient = axios.create({
    baseURL: BUBBLE_API_URL,
    headers: {
        'Authorization': `Bearer ${BUBBLE_API_TOKEN}`,
        'Content-Type': 'application/json'
    }
});
const bubbleService = new BubbleService(apiClient);
console.log('🚀 Creating REST API server...');
const app = createServer(bubbleService);
app.listen(PORT, () => {
    console.log(`\n✅ Bubble REST API is running!`);
    console.log(`🌐 Server: http://localhost:${PORT}`);
    console.log(`❤️  Health: http://localhost:${PORT}/health`);
    console.log(`📊 Schema: GET http://localhost:${PORT}/schema`);
    console.log(`📝 List: POST http://localhost:${PORT}/list`);
    console.log(`🔍 Get: POST http://localhost:${PORT}/get`);
    console.log(`➕ Create: POST http://localhost:${PORT}/create`);
    console.log(`✏️  Update: POST http://localhost:${PORT}/update`);
    console.log(`🗑️  Delete: POST http://localhost:${PORT}/delete`);
    console.log(`⚡ Workflow: POST http://localhost:${PORT}/workflow\n`);
});
//# sourceMappingURL=index.js.map