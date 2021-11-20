import axios from 'axios';
import Settings from '../settings';

export default class HttpModule {
  requestConfig = new Settings;

  /**
   * Create a new user
   * @param {credentials} credentials - userName and password object
   */
  async createUser(credentials: {name?: string, userName: string, passwordHash: string}) {
    if (this.requestConfig.userEndPoint && this.requestConfig.apiKey) {
      const response = await axios.post(this.requestConfig.userEndPoint, credentials, {
        headers: {apikey: this.requestConfig.apiKey},
      });

      return response.data;
    }
  }

  /**
   * Login to existing user
   * @param {credentials} credentials - userName and password object
   */
  async login(credentials: {userName: string, passwordHash: string}) {
    if (this.requestConfig.userEndPoint && this.requestConfig.apiKey) {
      const url =
        this.requestConfig.userEndPoint+'?userName='+credentials.userName+'&passwordHash='+credentials.passwordHash;
      const response = await axios.get(url, {
        headers: {apikey: this.requestConfig.apiKey},
      });

      return response.data;
    }
  }

  /**
   * Modify existing user using user object
   * @param {user} user - user object
   */
  async upsertUser(
      user: {name: string,
        userName: string,
        passwordHash: string,
        country: string,
        profilePic: string,
        },
  ) {
    if (this.requestConfig.userEndPoint && this.requestConfig.apiKey) {
      const response = await axios.put(this.requestConfig.userEndPoint, user, {
        headers: {apikey: this.requestConfig.apiKey},
      });

      return response.data;
    }
  }

  /**
   * Find user locations using Id
   * @param {userId} userId - userId string
   */
  async getUserLocations(userId: string) {
    if (this.requestConfig.userEndPoint && this.requestConfig.apiKey) {
      const url = this.requestConfig.visitEndPoint+'?UserId='+userId;
      const response = await axios.get(url, {
        headers: {apikey: this.requestConfig.apiKey},
      });

      return response.data;
    }
  }

  /**
   * Create or modify existing location using userId and name
   * @param {location} location - location object
   */
  async upsertLocation(
      location: {
        UserId: string,
        name: string,
        dateCreated: string,
        visited: boolean,
        coordinates: {lat: string, lon: string},
        category: string,
        },
  ) {
    if (this.requestConfig.visitEndPoint && this.requestConfig.apiKey) {
      const response = await axios.put(this.requestConfig.visitEndPoint, location, {
        headers: {apikey: this.requestConfig.apiKey},
      });

      return response.data;
    }
  }

  /**
   * Delete existing location using Id
   * @param {location} location - location id
   */
  async deleteLocation(location: {_id: string}) {
    if (this.requestConfig.userEndPoint && this.requestConfig.apiKey) {
      const url = this.requestConfig.visitEndPoint+'?visitId='+location._id;
      const response = await axios.delete(url, {
        headers: {apikey: this.requestConfig.apiKey},
      });

      return response.data;
    }
  }
}
