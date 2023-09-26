const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
 
const getLandingPage = (req, res) => {
    res.send("Hello, this is a welcome page")
}
const registerUser = (req, res) => {
    // console.log(req.body);
    let newUser = new userModel(req.body);
    newUser.save()
}

const signin = (req, res) => {
    let {email, password} = req.body;
    // userModel.findOne({email:req.body.email})
    userModel.findOne({email:email})
    .then((User)=>{
        User.comparedPassword(password, (err, isMatch)=>{
            let schoolPortal = process.env.SECRET
            console.log(isMatch);
            if (isMatch) {
                jwt.sign({email}, schoolPortal, {expiresIn: "1h"}, (err, token)=>{
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(token);
                        res.send({status: true, message: "user found", token: token})
                    }
                })
                // res.send({status: true, message: "user found"})
            } else {
                res.send({status: false, message: "user not found"})
            }
        })
        console.log("user found");
    })
    .catch((err)=>{
        // console.log(err);
        console.log("wrong credentials");
    })
}
// const getFormikPage = (req, res) => {
//     // console.log(req.body);
//     let newUser = new userModel(req.body);
//     newUser.save()
// }
const getDashboard = (req, res) => {
    let schoolPortal = process.env.SECRET
    let token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, schoolPortal, (err, result) => {
        if (err) {
            console.log(err);
            res.send({status: false, message: ""}) 
        }
        else {
            console.log(result);
            res.send({status: true, message: "welcome", result}) 
        }
    })

}
module.exports = { getLandingPage, registerUser, signin, getDashboard }
// module.exports = { getFormikPage }