const mongoose = require('mongoose');
const schema = mongoose.Schema({
    question:{
        type: String,
        required: true
    },
    options:{
       A:{
           type: String,
           required: true
       },
       B:{
           type: String,
           required: true
       },
       C:{
           type: String,
           required: true
       }
    },
    answer:{
        type: String,
        required: true
    },
},
{
    timestamps: true
});



module.exports = mongoose.model("Test", schema);