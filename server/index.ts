import express from 'express';

const app = express();

app.get("/status", (_, res) => {
    res.json({msg: "ok"});
});

const PORT : number = parseInt((process.env.PORT as string)) | 3001;

console.log(PORT);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));