import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

import './database';

//ROUTES
import authRoutes from './routes/auth.routes';
import deckRoutes from './routes/deck.routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(cors());

// SERVE REACT APP
/*
app.use(express.static(path.resolve(__dirname, '../rekapp/build')));

app.get("/api", (req, res) => {
    res.json({msg: "Hello world"});
})

// to redirect to our react app if a url doesn't exists
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../rekapp/build', 'index.html'));
});

*/

const PORT : number = parseInt((process.env.PORT as string)) | 3001;

app.use("/auth", authRoutes);
app.use("/api", deckRoutes);


app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))