import axios from 'axios';

export async function registerInstitute(data) {
  const resp = await axios.post('http://localhost:8080/api/institutes', data);
  return resp.data;
}