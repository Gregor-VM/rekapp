import axios from 'axios';

const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNzg5NDQ2NjZjYjMzNjdhOTJiZWZiZSIsImlhdCI6MTYzNTMwMjE1NSwiZXhwIjoxNjM1NzM0MTU1fQ.xTPlJmR0tDimWfwvv4apFaWK-9dh_MkPDlXAtpn-7mE";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3001/api/",
    headers: {Authorization: token}
});

export default axiosInstance;