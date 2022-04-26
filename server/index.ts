import app from './app';

const PORT : number = parseInt((process.env.PORT as string)) | 3001;

app.listen(PORT, "0.0.0.0", () => console.log(`Server listening on port ${PORT}!`));