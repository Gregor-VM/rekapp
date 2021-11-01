import axios from 'axios';

const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNzg5NDQ2NjZjYjMzNjdhOTJiZWZiZSIsImlhdCI6MTYzNTczNDc3MSwiZXhwIjoxNjM2MTY2NzcxfQ.oXRYd0YrqsBykjSrbFCPgjOVLAX_3TaDLHmBZ1wq3ps";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3001/api/",
    headers: {Authorization: token}
});

export default axiosInstance;