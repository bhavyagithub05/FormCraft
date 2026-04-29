import axios from 'axios';

// This creates a base instance so we don't have to type localhost:5000 every time
const API = axios.create({ baseURL: 'http://localhost:5000/api' });

// ==========================================
// THE INTERCEPTOR (For JWT Authentication)
// ==========================================
// This runs silently before EVERY single request and attaches the user's token
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('formcraft_token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// ==========================================
// AUTH API CALLS
// ==========================================
export const registerUser = (userData) => API.post('/auth/register', userData);
export const loginUser = (userData) => API.post('/auth/login', userData);

// ==========================================
// FORM API CALLS
// ==========================================
export const createForm = (formData) => API.post('/forms', formData);
export const getForms = () => API.get('/forms');
export const getFormById = (id) => API.get(`/forms/${id}`); // Note: Public route for Live Form
export const updateForm = (id, formData) => API.put(`/forms/${id}`, formData);
export const deleteForm = (id) => API.delete(`/forms/${id}`);

// ==========================================
// RESPONSES API CALLS
// ==========================================
export const submitResponse = (responseData) => API.post('/responses', responseData); // Public route
export const getResponses = (formId) => API.get(`/responses/${formId}`); // Protected route for Dashboard

export default API;