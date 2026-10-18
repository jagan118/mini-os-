const express = require('express');
const router = express.Router();

const {getMemoryInfo} = require('../services/memoryService');

router.get('/',async(req,res)=>{
    try{

        const memoryInfo = await getMemoryInfo();
        res.status(200).json({
            success:true,
            data:memoryInfo
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
});

module.exports = router;