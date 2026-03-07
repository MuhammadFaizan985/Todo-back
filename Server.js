const express = require('express');
require('dotenv').config();
const connectDB = require("./config/db")
const cookieParser = require('cookie-parser')
const allRoutes = require("./routes/index");
const cors = require("cors")
const { connectRedis } = require("./config/redis");



const app = express();
const port = 3000;


app.use(cors());
app.use(cookieParser());

app.use(express.json());



app.use(allRoutes);

connectDB();
connectRedis();

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
