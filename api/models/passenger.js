const mongoose      = require("mongoose")



const passengerSchema = mongoose.Schema({
    Survived:Number,
    Pclass:Number,
    Name:String,
    Sex:{
        type:String,
        enum:['male', 'female']
    },
    Age:Number,
    Ticket:String,
    Fare:Number,
    Cabin:String
});


module.exports =mongoose.model('Passenger',passengerSchema);



// mongoimport --db titanic --collection passengers --type csv --file titanic.csv --headerline