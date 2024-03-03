const jwt = require("jsonwebtoken");
const zod = require("zod");
const JWT_SECRET = require("../config");
const {UserModel, AccountModel} = require("../database/db");
const express = require("express");
const router = express.Router();
const {authMiddleware} = require("./middleware");

const signupBody = zod.object({
    username: zod.string().email(),
	firstName: zod.string(),
	lastName: zod.string(),
	password: zod.string()
})

router.post("/signup",async (req,res)=>{
    const {success} = signupBody.safeParse(req.body);
    if(!success){
        return res.status(404).json({
            msg: "Incorrect Input"
        })
    }

    
    const result = await UserModel.findOne({
        username: req.body.username
    })

    if(result){
        return res.status(404).send({
            msg: "User Already Exist"
        })
    }

    const user = await UserModel.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName 
    })

    const userId = user._id;
    //Account created with random amount
    await AccountModel.create({
        userId,
        balance: 1 + Math.random() * 10000
    })
    if(!user){
        res.json({
            msg:"Could not store the users"
        });
        return;
    }
    const Token = jwt.sign({
        userId
    },JWT_SECRET);
    
    res.json({
        msg: "Token Created",
        token: Token,
        userId: userId
    });


})
const signinBody = zod.object({
    username: zod.string().email(),
	password: zod.string()
})
router.post("/signin",async (req,res) =>{
    const success = signinBody.safeParse(req.body);
    if(!success){
        return res.status(404).json({
            msg: "Incorrect Input"
        })
    }
    const result = await UserModel.findOne({
        username: req.body.username,
        password: req.body.password
    })
    if(result){
        const userId = result._id;
        const Token = jwt.sign({
            userId: result._id
        }, JWT_SECRET);
        res.json({
            userId:userId,
            token: Token
        });
        return;
    }
    res.status(404).json({
        msg: "No User Found"
    })

})
const updateBody = zod.object({
	password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

router.put("/",authMiddleware,async (req,res)=>{
    const success = updateBody.safeParse(req.body);
    if(!success){}
    const account = await UserModel.findOne({
        username: req.body.username
    })

    await UserModel.findOneAndUpdate(
        { _id: req.userId }, // Query to find the document to update
        { $set: { 
            username: req.body.username, 
            FirstName: req.body.FirstName, 
            LastName: req.body.LastName 
        }},
        { new: true } // To return the updated document
    );
    if (!account) {
        return res.status(404).json({ msg: "User not found" });
    }
})

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await UserModel.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})
module.exports = router;