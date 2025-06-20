// Francis Tardif et Amélie Roussin

const express = require("express");
const app = express();
const PORT = 3000;

const cors = require("cors");
app.use(cors({
    origin: ['https://amelieroussin.ca', 'https://www.amelieroussin.ca']
}));

app.use(express.json());

const negotiate = require('./middlewares/negotiate');
app.use(negotiate);

const statusRoute = require('./routers/statusRoutes');
app.use('/status', statusRoute);


app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});