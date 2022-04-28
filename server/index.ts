import app from './app';

const PORT = process.env.PORT;

app.listen((PORT ? PORT : 3001), () => console.log(`Server listening on port ${3001}!`));