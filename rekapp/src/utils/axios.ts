import axios from 'axios';

const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNzg5NDQ2NjZjYjMzNjdhOTJiZWZiZSIsImlhdCI6MTY0NzM4OTc1MiwiZXhwIjoxNjQ3ODIxNzUyfQ.2_ZXJXPZBcG3KhbGx3uAbPcAXhMcLnTNd5VKx7KUlZM";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3001/api/",
    headers: {Authorization: token}
});

export default axiosInstance;