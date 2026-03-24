import { AxiosInstance } from 'axios';
import { BubbleSchema } from './types.js';
export declare class BubbleService {
    private client;
    private schema;
    constructor(client?: AxiosInstance);
    getSchema(): Promise<BubbleSchema>;
    list(dataType: string, params?: {
        limit?: number;
        cursor?: number;
    }): Promise<any>;
    get(dataType: string, id: string): Promise<any>;
    create(dataType: string, data: Record<string, any>): Promise<any>;
    update(dataType: string, id: string, data: Record<string, any>): Promise<any>;
    delete(dataType: string, id: string): Promise<any>;
    executeWorkflow(workflowName: string, data: Record<string, any>): Promise<any>;
    listOrganizations(firstEntry?: number, lastEntry?: number): Promise<any>;
    listBranches(firstEntry?: number, lastEntry?: number): Promise<any>;
    addBranch(branchData: {
        address: string;
        city: string;
        'default-template-name': string;
        'default-template-id': string;
        duration: number;
        name: string;
        organization_id: string;
        isActive?: boolean;
    }): Promise<any>;
    signNewUser(userData: {
        email: string;
        first_name: string;
        last_name: string;
        phone: string;
        role: string;
        password: string;
    }): Promise<any>;
}
//# sourceMappingURL=bubbleService.d.ts.map