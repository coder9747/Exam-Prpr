const mongoose = require("mongoose");


const QuestionSchem = mongoose.Schema({
    question:{
        type:String,
        require:true,
    },
    options:{
        type:Array,
        require:true,
    },
    correct:{
        type:String,
        require:true,
    }
})

const QuestionModel = mongoose.model("question",QuestionSchem);

module.exports = QuestionModel;


