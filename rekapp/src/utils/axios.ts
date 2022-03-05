import axios from 'axios';

const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNzg5NDQ2NjZjYjMzNjdhOTJiZWZiZSIsImlhdCI6MTY0NjQ4ODMxMiwiZXhwIjoxNjQ2OTIwMzEyfQ.3r_4vKC_nHvCwuhwpfMU3_L8f04uwJx6sIy-KSorCvE";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3001/api/",
    headers: {Authorization: token}
});

export default axiosInstance;