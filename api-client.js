/**
 * YUVA'S SCHOOL - API Client
 * Handles all communication with the backend server
 */

class YuvasAPI {
  constructor(baseURL = '/api') {
    this.baseURL = baseURL;
    this.timeout = 30000; // 30 seconds
  }

  /**
   * Generic fetch wrapper with error handling
   */
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: this.timeout
    };

    const config = { ...defaultOptions, ...options };

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), config.timeout);

      const response = await fetch(url, {
        ...config,
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json();
        throw {
          status: response.status,
          message: errorData.message || 'Request failed',
          data: errorData
        };
      }

      return await response.json();
    } catch (error) {
      if (error.name === 'AbortError') {
        throw { message: 'Request timeout' };
      }
      throw error;
    }
  }

  /**
   * HEALTH CHECK
   */
  async checkHealth() {
    return this.request('/health');
  }

  /**
   * CONTACT FORM
   */
  async submitContactForm(data) {
    return this.request('/contact', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  async checkContactStatus() {
    return this.request('/contact/status');
  }

  /**
   * ADMISSION FORM
   */
  async submitAdmissionForm(data) {
    return this.request('/admissions', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  async getAvailableClasses() {
    return this.request('/admissions/classes');
  }

  async checkAdmissionsStatus() {
    return this.request('/admissions/status');
  }
}

// Create global instance
const apiClient = new YuvasAPI();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = apiClient;
}
