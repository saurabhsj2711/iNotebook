const express = require('express');
const User = require("../models/User");
const {body,validationResult} = require('express-validator'); // data validation
const router = express.Router(); // route through api
const bcrypt = require('bcryptjs'); // password encryption
const jwt = require('jsonwebtoken'); // to create token for each user logged in or created
const fetchuser = require('../middleware/fetchuser'); // to fetch user data from token

const JWT_SECRET = "UsersAuthenticationToken";

//Route 1 : Create user using POST /api/auth/ .No login required
router.post('/createuser',
    [body("name","Enter valid name").isLength({min:5}),
    body("email","Enter valid email id").isEmail(),
    body("password","Password length must be greater than 8").isLength({min:8})]
,async(req,res) =>{

    let success = false;

    // try and catch to show coding errors.
    try{

   // Checking for validation errors
    const error = validationResult(req);

    // if validation error is there 
    if(!error.isEmpty())
    {
        success = false;
        return res.status(400).json({success,errors : error.array()});
    }

    let user = await User.findOne({email:req.body.email});

    if(user){
        success = false;
        return res.status(400).json({success,error:"Sorry a user with this mail id already exists!!"})
    
    }

    // create secure password using bcryptjs
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password,salt);


    //otherwise create user
    user = await User.create(
        {
        name:req.body.name,
        email:req.body.email,
        password:secPass
        });

    const data = {
        user : {
            id : user.id
        }
    };

    const authToken = jwt.sign(data,JWT_SECRET);
    success = true;
    res.json({success,authToken});
    }

    catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error")
    }
});

// Route 2 : Login user using POST /api/auth/login 

router.post('/login',[
    body("email","Enter valid mail id").isEmail(),
    body("password","Cannot enter blank password").exists()],
    async(req,res) => {

        let success = false;

        const error = validationResult(req);

        if(!error.isEmpty())
        {
            success = false;
            return res.status(400).json({success,error:error.array()});
        }

        const {email,password} = req.body;

        try{
            const user = await User.findOne({email});

            if(!user){
                success = false;
                return res.status(400).json({success,error:"Please provide correct credentials"});
            }

            const passwordCompare = await bcrypt.compare(password,user.password);

            if(!passwordCompare){
                success = false;
                return res.status(400).json({success,error : "Please provide correct credentials"});
            }

            const data = {
                user : {
                    id : user.id
                }
            };

            const authToken = jwt.sign(data,JWT_SECRET);
            success = true;

            res.json({success,authToken});

        }catch(error){
            success = false;
            console.log(error);

            return res.status(500).send("Internal server error");
        }
        

    })

// Route 3 : Get user data using POST /api/auth/getuser

router.post('/getuser',
    fetchuser, 
    async(req,res) => {
        try {
            const userid = req.user.id;

            const userData = await User.findById(userid).select("-password");

            res.send(userData);
        } catch (error) {
            console.log(error);
            res.status(500).json({error : "Internal server error."})
        }
    })

module.exports = router;