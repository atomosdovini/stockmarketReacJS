import axios from 'axios';



axios.defaults.headers.common['Authorization'] = process.env.AUTHORIZATION_API_TOKEN;
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
export const api = axios.create({
  
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `JWT ${localStorage.getItem('access')}`,
    'Accept': 'application/json',
}
});


const controller = new AbortController()
