import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

/*

import './database';

//ROUTES
import authRoutes from './routes/auth.routes';
import deckRoutes from './routes/deck.routes';

*/

const app = express();

app.use(express.json({limit: "30mb"}));
app.use(express.urlencoded({extended: true, limit: "30mb"}));

/*

app.use(cors());

// SERVE REACT APP

app.use(express.static(path.resolve(__dirname, '../rekapp/build')));

app.get("/api", (req, res) => {
    res.json({msg: "Hello world"});
})

/*

// to redirect to our react app if a url doesn't exists
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../rekapp/build', 'index.html'));
});

*/

/*

app.use("/auth", authRoutes);
app.use("/api", deckRoutes);

*/

export default app;