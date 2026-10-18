const express = require('express');
const router = express.Router();

const {getCPUInfo} = require('../services/cpuServer');

//get/cpu
router.get('/',async(req,res)=>{

    try{

        const cpuInfo = await getCPUInfo();

        res.status(200).json({
            sussess:true,
            data:cpuInfo
        })
    }catch(error){
    res.status(500).json({
        sucess:false,
        message:error.message
});
    }
});

module.exports = router;