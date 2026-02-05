const mongoose = require('mongoose');


const userSchema = new mongoose.Schema(
    {
        username : {
            type : String ,
            require : [true , "username is requires"],
            trim : true,
            minlength : [4 , "username must be minimum  4 character"],
            unique : true
        },
        email : {
            type : String,
            require : [true , "email is requires"],
            trim : true,
            unique : true,
            lowercase : true ,
            match : [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
        } , 
        password : {
            type : String,
            require : [true , "password is requires"],
            minlength : 6,
            select : false

        }
    },
    {
        timestamps : true
    }
)
const User = mongoose.model("User",userSchema);
module.exports = User;