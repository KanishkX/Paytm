const express = require("express");
const {AccountModel} = require("../database/db");
const {authMiddleware} = require("./middleware");
const router = express.Router();
router.get("/balance",authMiddleware,async (req,res)=>{
    const user = req.userId;
    const account =  await AccountModel.findOne({
        userId: user
    })
    if(account){
        res.json({
            balance: account.balance
        })
    }else{
        res.json({
            user:user
        })
    }
    

})

router.post("/transfer",authMiddleware,async (req,res)=>{
    const user = await AccountModel.findOne({
        userId: req.body.to
    })
    if(user){
        await AccountModel.updateOne({
            userId: req.userId
        },{
            $inc:{
                balance: -req.body.amount
            }
        })

        await AccountModel.updateOne({
            userId: to
        },{
            $inc:{
                balance:amount
            }
        })

        res.json({
            message: "Transfer successful"
        })
    }   


})

module.exports = router;



