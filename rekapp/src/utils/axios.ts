import axios from 'axios';

const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNzg5NDQ2NjZjYjMzNjdhOTJiZWZiZSIsImlhdCI6MTY0Mjc4NjkzOSwiZXhwIjoxNjQzMjE4OTM5fQ.R8NAycMSlOTNXDFdxIe7yPk0esXkj1Zvvb6dGLxDSOE";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3001/api/",
    headers: {Authorization: token}
});

export default axiosInstance;