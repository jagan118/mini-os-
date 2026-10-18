const si = require('systeminformation');

async function getCPUInfo(){

    try{
        const cpu = await si.cpu();

        const load = await si.currentLoad();

        return {
            model:cpu.brand,
            manufacture:cpu.manufacturer,
            cores:cpu.cores,
            speed:cpu.speed+"GHz",
            usage:load.currentLoad.toFixed(2)+"%"
        };
    }catch(error){
        throw error;
    }
}

module.exports ={
    getCPUInfo
}