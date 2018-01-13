const express           = require("express"),
      router            = express.Router({mergeParams: true}),
      Passenger         = require("../models/passenger"),
      checkAuth         = require("../middleware/check-auth")




//......................................GET ALL PASSENGERS DETAILS.......................................
router.get('/',(req, res) => {
   Passenger.find()
   .exec()
   .then(docs => {
       const response = formatResult(docs)       
       res.status(200).json(response)
   })
   .catch(err => {
       res.status(500).json({
           error:err
       })
   });
})


// ........................................ADD PASSENGER DETAILS..............................................
router.post('/' ,checkAuth,(req, res) => {
    const passenger = new Passenger(req.body.passenger)
    console.log(passenger)
    passenger.save()
    .then(result => {
           res.status(201).json(result)
           console.log(passenger);
       })
    .catch(err => {
           res.status(500).json(err)
       })
});


//..........................................UPDATE PASSENGERS DETAILS..............................................
router.put('/:passengerId', checkAuth, (req, res) => {
    Passenger.findByIdAndUpdate(req.params.passengerId,req.body.passenger)
    .exec()
    .then(updatedPassenger => {
        res.status(200).json({
            message:"Passenger details Updated",
            request:{
                message:"Updated Passenger details",
                type:"GET",
                URL:"https://rocky-sands-97493.herokuapp.com/passengers"+updatedPassenger._id
            }
        })
    })
    .catch(err => {
        res.status(500).json({
            error:err
        })
    }) 
})

//..........................................DELETE A PASSENGER'S DETAILS..............................................
router.delete("/:passengerId",checkAuth, (req, res) => {
    Passenger.findByIdAndRemove(req.params.passengerId)
    .then(() => {
        res.status(200).json({
            message:"Passenger details deleted"
        })
    })
    .catch(err => {
        res.status(500).json({
            error:err
        })
    })
})


//.............................TO GET PASSENGERS DETAILS WHO HAVE SURVIVED......................
router.get('/survived', (req, res) => {
    Passenger.find({Survived:1})
       .then(docs => {
           const response = formatResult(docs)           
           res.status(200).json(response)
       })
       .catch(err => {
           res.status(500).json({
               error:err
           })
       })

})

//..............................TO GET DIED PASSENGERS DETAILS.................................

router.get('/died', (req, res) => {
    Passenger.find({Survived:0})
       .then(docs => {
           const response = formatResult(docs)
           
           res.status(200).json(response)
       })
       .catch(err => {
           res.status(500).json({
               error:err
           })
       })

})

//..............................TO GET DETAILS OF PASSENGERS WHO WERE CHILDERN.....................

router.get('/childern', (req, res) => {
    Passenger.find({Age:{$lte:12}})
       .then(docs => {
           const response = formatResult(docs)
           res.status(200).json(response)
       })
       .catch(err => {
           res.status(500).json({
               error:err
           })
       })

})

//..............................TO GET DETAILS OF PASSENGERS WHO WERE ADULTS.....................

router.get('/childern', (req, res) => {
    Passenger.find({Age:{$gt:12}})
       .then(docs => {
           const response = formatResult(docs)
           res.status(200).json(response)
       })
       .catch(err => {
           res.status(500).json({
               error:err
           })
       })

})


//..............................TO GET SPECIFIC PASSENGERS DETAILS..............................
router.get('/:passengerId', (req, res) => {
    const id = req.params.passengerId
    console.log(req.params.passengerId)
    Passenger.findById(id)
    .exec()
    .then(passenger => {
        if(passenger){
            res.status(200).json({
                passenger,
                request:{
                    message:"Get all Passengers ",
                    type:"GET",
                    URL:"https://rocky-sands-97493.herokuapp.com/passengers"
                }
            })
        }else{
            res.status(404).json({
                message:"Invalid Passenger Id"
            })
        }
        
    })
    .catch(err => {
        res.status(500).json({
            error:err
        })
    })
})





// ..........................................TO FORMAT...........................
var formatResult = docs => {
    return {
        count:docs.length,
        passenger:docs.map(doc =>{
            return {
                PassengerId:doc._id,           
          //   Pclass:doc.Pclass,
               Name:doc.Name,
               Sex:doc.Sex,
               Age:doc.Age,
           //   Survived:doc.Survived,
           //   Ticket:doc.Ticket,
           //   Fare:doc.Fare,
           //   Cabin:doc.Cabin,
               request:{
                   message:"For more information",
                   type:"GET",
                   URL:""+doc._id
                   }
               }

       })
    
    }
    
}

module.exports = router;



// {"passenger":{
//         "Survived":"0",
//         "Pclass" :"66",
//         "Name" :"Deepak",
//         "Sex" :"male",
//         "Age" :"33",
//         "Ticket" :"45555",
//         "Fare" :"45.26",
//         "Cabin":"B3"
// }
// }



