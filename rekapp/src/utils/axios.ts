import axios from 'axios';

const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNzg5NDQ2NjZjYjMzNjdhOTJiZWZiZSIsImlhdCI6MTY0NTQ4OTM1NywiZXhwIjoxNjQ1OTIxMzU3fQ.87ck-7s4JVb599NCNuLkpdTtfE0jokpnGK9w0Xwj63I";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3001/api/",
    headers: {Authorization: token}
});

export default axiosInstance;