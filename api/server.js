// Francis Tardif et Amélie Roussin

import express, { json } from "express";
const app = express();
const PORT = 3000;

import cors from "cors";
app.use(cors({
    origin: ['https://amelieroussin.ca', 'https://www.amelieroussin.ca']
}));

app.use(json());

import negotiate from './middlewares/negotiate.js';
app.use(negotiate);

import statusRoute from './routers/statusRoutes.js';
app.use('/status', statusRoute);


app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});