import createApiClient from "./api";

class AuthService {
  constructor(baseUrl = "/api/auth") {
    this.api = createApiClient(baseUrl);
  }

  async register(data) {
    try {
      const response = await this.api.post("/staffregister", data);
      return response.data;
    } catch (error) {
      console.error("Error registering user:", error);
      throw error;
    }
  }

  async login(data) {
    try {
      const response = await this.api.post("/stafflogin", data);
      return response.data;
    } catch (error) {
      console.error("Error logging in user:", error);
      throw error;
    }
  }
}

export default new AuthService();
