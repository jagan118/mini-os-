const express = require('express');
const router = express.Router();

const {getProcesses} = require('../services/processService');


router.get('/',async (req,res)=>{
    try{
        const processList = await getProcesses();

        res.status(200).json({
            success:true,
            count:processList.length,
            data:processList
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
});

router.post('/kill/:pid',(req,res)=>{
    try{
        const pid = parseInt(req.params.pid);

        if(isNaN(pid)){
            return res.status(400).json({
                success:false,
                message:'Invalid PID'
            });
        }

        process.kill(pid);

        res.status(200).json({
            success:true,
            message:`process with PID ${pid} terminated successfully` 
        });

    }catch(error){
          console.log(error);
    console.log(error.code);
    console.log(error.message);
if (error.code === 'ESRCH') {
    return res.status(404).json({
        success: false,
        message: 'Process not found'
    });
}

if (error.code === 'EPERM') {
    return res.status(403).json({
        success: false,
        message: 'Permission denied'
    });
}        res.status(500).json({
            success:false,
            message:error.message
        });
    }
})

module.exports = router;