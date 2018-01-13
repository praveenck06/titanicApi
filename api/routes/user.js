const express           = require("express"),
      router            = express.Router({mergeParams: true}),
      User              = require("../models/user"),
      bcrypt            = require("bcrypt"),
      jwt               = require("jsonwebtoken")

router.post('/signup', (req, res) => {
    User.find({email:req.body.email})
    .exec()
    .then(user => {
        if(user.length >=1){
            return res.status(409).json({
                message:"email exists"
            })
        }else{
            bcrypt.hash(req.body.password,10, (err, hash) =>{
                   if(err){
                       return res.status(500).json({
                           error:err
                       })
                   }else{
                       const user = new User({
                       email: req.body.email,
                       password:hash
                    });
                    user.save()
                    .then(result => {
                        console.log(result)
                        res.status(201).json({
                            message:"user created"
                        })
                    })
                    .catch(err => {
                        res.status(500).json({
                            error:err
                        })
                    });
                   }
               })            
        }
    })

    
})

router.post('/login', (req, res) => {
    User.find({email:req.body.email})
    .exec()
    .then(user => {
        if(user.length < 1 ){
            console.log("then")
            return res.status(401).json({
                message:"Auth failed"
            });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if(err){
                return res.status(401).json({
                    message:"Auth failed"
                })
            }
            if(result){
                const token = jwt.sign({
                    email: user[0].email,
                    userId: user[0]._id
                },
                process.env.JWT_KEY,
                {
                    expiresIn:"1h"
                });
                return res.status(200).json({
                    message:'Auth Successful',
                    token:token
                })
            }
            return res.status(401).json({
                    message:"Auth failed"
                })
        })
    })
    .catch(err => {
        res.status(500).json({
            error:err
        })
    });
})

router.delete('/:userId', (req, res) => {
    User.remove({_id:req.params.userId}).exec()
    .then(result => {
        res.status(200).json({
            message : "user deleted"
        })
    })
    .catch(err => {
        res.status(500).json({
            error:err
        })
    })
})

module.exports = router;