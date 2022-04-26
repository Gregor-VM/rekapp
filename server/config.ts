

const SECRET = (process.env.SECRET as string);
const MONGO_URL = (process.env.MONGO_URL as string);

export default {
    SECRET,
    MONGO_URL
};