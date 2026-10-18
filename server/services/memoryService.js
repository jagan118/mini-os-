const si = require('systeminformation');

async function getMemoryInfo(){

    try{
        //get memory infoo
        const memory = await si.mem();

        return {
            totalRAM:(memory.total / (1024**3)).toFixed(2)+"GB",
            usedRAM:(memory.used / (1024**3)).toFixed(2)+"GB",
            freeRAM:(memory.free / (1024**3)).toFixed(2)+"GB",
            usage:((memory.used / memory.total)* 100).toFixed(2)+"%" 
        };
    }catch(error){
        throw error;
    }
}

module.exports = {
    getMemoryInfo
}