import connection from '../../connection.json';

export default class Settings {
  userEndPoint: string | undefined;
  visitEndPoint: string | undefined;
  apiKey: string | undefined;

  /**
     * Fetch configuration information
     */
  constructor() {
    try {
      this.userEndPoint = connection.userUrl;
      this.visitEndPoint = connection.visitsUrl;
      this.apiKey = connection.apikey;
    } catch (e) {
      throw new Error('Missing connection information');
    }
  }
}
