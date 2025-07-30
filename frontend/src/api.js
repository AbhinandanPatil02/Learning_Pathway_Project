import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const API = axios.create({ baseURL: `${API_BASE_URL}/pathways` });

export const generatePathway = (technology) => API.post('/generate', { technology });
// `${API_BASE_URL}/users/register`