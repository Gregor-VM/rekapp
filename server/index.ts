import app from './app';

const PORT : number = parseInt((process.env.PORT as string)) | 3001;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));