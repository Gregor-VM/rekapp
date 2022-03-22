import axios from 'axios';

const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNzg5NDQ2NjZjYjMzNjdhOTJiZWZiZSIsImlhdCI6MTY0Nzk4MjcxNCwiZXhwIjoxNjQ4NDE0NzE0fQ.1n-VqtRT8dkrLbaF9ZTfibywQVlNaAyqpuTYsLPUJlY";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3001/api/",
    headers: {Authorization: token}
});

export default axiosInstance;