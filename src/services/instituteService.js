import axios from 'axios';

const BASE_URL = 'http://localhost:8081/institutions';

// Register Institution
export async function registerInstitute(data) {
  try {
    const response = await axios.post(`${BASE_URL}/register`, data);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error('Registration error:', error);
    return {
      success: false,
      message: error?.response?.data?.message || 'Registration failed.',
    };
  }
}

// Update Institution Email
export async function updateEmail(id, email) {
  try {
    const response = await axios.put(`${BASE_URL}/${id}/update-email`, { email });
    return response.data;
  } catch (error) {
    console.error('Update email error:', error);
    throw new Error(error?.response?.data?.message || 'Failed to update email.');
  }
}
