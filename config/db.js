const mongoose = require("mongoose")


const connectDB = async  () => {
  try {

    const conn = await mongoose.connect(process.env.DATABASE_URI + "/TodoApp")

    console.log(`Database connected  ${conn.connection.host}`) // remove in production
   
  } catch(error) {
   console.log(`Dabse connection failed :  ${error.message}`)
   process.exit(1)
  }
};

module.exports = connectDB;

