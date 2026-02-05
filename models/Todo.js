const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema(
    {
        username : {
            type : String,
            require : true,
            index : true,
        },

        todoName : {
            type : String,
            require : true,
            trim : true

        },

        todoDescription : {
            type : String,
            trim : true,
            default : ""

        },

        isDone : {
            type : Boolean,
            default : false,
        },
    },
    {
        timestamps : true,
        strict : true
    }
)
const Todo = mongoose.model("Todo",todoSchema);
module.exports = Todo;