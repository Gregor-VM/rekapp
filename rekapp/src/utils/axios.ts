import axios from 'axios';

const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNzg5NDQ2NjZjYjMzNjdhOTJiZWZiZSIsImlhdCI6MTY0Njk1NTc3NCwiZXhwIjoxNjQ3Mzg3Nzc0fQ.U2QGx7Kddd4mCzf_M_hkM_T9AijtwgUT0RKVXQyR9Gk";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3001/api/",
    headers: {Authorization: token}
});

export default axiosInstance;