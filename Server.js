const express = require('express');
require('dotenv').config();
const connectDB = require("./config/db")
const cookieParser = require('cookie-parser') 
const allRoutes = require("./routes/index");
const cors = require("cors")



const app = express();
const port = 3000;


app.use(cors());
app.use(cookieParser());

app.use(express.json());



app.use(allRoutes);

connectDB();

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
