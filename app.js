const express           = require("express"),
      mongoose          = require("mongoose"),
      bodyParser        = require("body-parser"),
      //.................Routes...................
      passengerRoutes   = require("./api/routes/passengers"),
      userRoutes        = require("./api/routes/user"),
      //.................Models...................
      Passenger         = require("./api/models/passenger")
      
      
mongoose.Promise =global.Promise;
mongoose.connect("mongodb://localhost/titanic", {useMongoClient: true});

const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.use('/passengers',passengerRoutes);
app.use('/user', userRoutes)




app.listen(process.env.PORT, process.env.IP, () => {
    console.log("server has started");
});