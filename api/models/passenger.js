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
//  mongoimport -h ds251807.mlab.com:51807 -d titanic -c passengers -u praveen -p praveen --file titanic.csv --type csv --headerline 
// ds251807.mlab.com:51807

// ds012345.mlab.com:56789

// mongoimport -h ds251807.mlab.com:51807 -d titanic -c passengers -u praveen -p praveen --file titanic.csv --type csv --headerline


// mongoexport -d titanic -c passengers --out export.0.json