import apiClient from './apiClient.js';
export class BubbleService {
    client;
    schema = null;
    constructor(client = apiClient) {
        this.client = client;
    }
    // Modify getSchema to use the root API path
    async getSchema() {
        if (!this.schema) {
            try {
                // Using /api/1.1/meta directly instead of just /meta
                const response = await this.client.get('/meta');
                this.schema = response.data;
            }
            catch (error) {
                console.error('Schema fetch error:', error.response?.data || error.message);
                throw error;
            }
        }
        return this.schema;
    }
    // Modify list method to use the correct API version path
    async list(dataType, params) {
        try {
            const queryParams = new URLSearchParams();
            if (params?.limit)
                queryParams.append('limit', params.limit.toString());
            if (params?.cursor)
                queryParams.append('cursor', params.cursor.toString());
            // Using /api/1.1/obj/ path
            const response = await this.client.get(`/obj/${dataType}?${queryParams}`);
            return response.data;
        }
        catch (error) {
            const errorMsg = error.response?.data?.message || error.message;
            console.error(`Error listing ${dataType}:`, errorMsg);
            throw new Error(`Failed to list ${dataType}: ${errorMsg}`);
        }
    }
    async get(dataType, id) {
        try {
            const response = await this.client.get(`/obj/${dataType}/${id}`);
            return response.data;
        }
        catch (error) {
            console.error(`Error getting ${dataType} ${id}:`, error);
            throw error;
        }
    }
    async create(dataType, data) {
        try {
            const response = await this.client.post(`/obj/${dataType}`, data);
            return response.data;
        }
        catch (error) {
            console.error(`Error creating ${dataType}:`, error);
            throw error;
        }
    }
    async update(dataType, id, data) {
        try {
            const response = await this.client.patch(`/obj/${dataType}/${id}`, data);
            return response.data;
        }
        catch (error) {
            console.error(`Error updating ${dataType} ${id}:`, error);
            throw error;
        }
    }
    async delete(dataType, id) {
        try {
            const response = await this.client.delete(`/obj/${dataType}/${id}`);
            return response.data;
        }
        catch (error) {
            console.error(`Error deleting ${dataType} ${id}:`, error);
            throw error;
        }
    }
    // Workflow execution
    async executeWorkflow(workflowName, data) {
        try {
            const response = await this.client.post(`/wf/${workflowName}`, data);
            return response.data;
        }
        catch (error) {
            console.error(`Error executing workflow ${workflowName}:`, error);
            throw error;
        }
    }
    // Specific BCR Pro methods
    async listOrganizations(firstEntry, lastEntry) {
        return this.executeWorkflow('list_all_organizations', {
            first_entry: firstEntry,
            last_entry: lastEntry,
        });
    }
    async listBranches(firstEntry, lastEntry) {
        return this.executeWorkflow('list_all_branches', {
            first_entry: firstEntry,
            last_entry: lastEntry,
        });
    }
    async addBranch(branchData) {
        return this.executeWorkflow('add_branch_api', branchData);
    }
    async signNewUser(userData) {
        return this.executeWorkflow('sign_new_user', userData);
    }
}
//# sourceMappingURL=bubbleService.js.map