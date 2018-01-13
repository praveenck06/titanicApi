const mongoose      = require("mongoose");


const userSchema = mongoose.Schema({
    email:{
        type: String,
        requried:true,
        unique:true,
        match:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password:{ type: String, requried:true}
});


module.exports = mongoose.model('User', userSchema)