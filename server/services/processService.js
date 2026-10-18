const si = require('systeminformation');
async function getProcesses(){

    try{
        const processes = await si.processes();

        return processes.list.map(process => ({
            pid:process.pid,
            name:process.name,
            cpu:process.cpu.toFixed(2)+"%",
            memory:process.mem.toFixed(2)+"%"
        }))

    }catch(error){
        throw error
    }
}
module.exports = {
    getProcesses
}