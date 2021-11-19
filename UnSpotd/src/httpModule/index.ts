import axios from 'axios';
import Settings from '../settings';

const requestConfig = new Settings;

export default class HttpModule {

    async createUser(credentials: {name?: string, userName: string, passwordHash: string}) {
        if(requestConfig.userEndPoint && requestConfig.apiKey) {
            const response = await axios.put(requestConfig.userEndPoint, credentials, {
                headers: {apikey: requestConfig.apiKey}
            });
            return response.data;
        }
    }
    
    async login(credentials: {userName: string, passwordHash: string}) {
        if(requestConfig.userEndPoint && requestConfig.apiKey) {
            const url = requestConfig.userEndPoint+"?userName="+credentials.userName+"&passwordHash="+credentials.passwordHash;
            const response = await axios.get(url, {
                headers: {apikey: requestConfig.apiKey}
            });
            return response.data;
        }
    }

    async getVisits(UserId: string) {
        if(requestConfig.userEndPoint && requestConfig.apiKey) {
            const url = requestConfig.visitEndPoint+"?UserId="+UserId;
            const response = await axios.get(url, {
                headers: {apikey: requestConfig.apiKey}
            });
            return response.data;
        }
    }
    // Every endpoint logic for every view goes here
    // create async function with types
    // Types in src/interface
}
