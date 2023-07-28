const cron = require('node-cron');
const mockoonApi = require('./mockoonAPI')
const pubsubService = require('./pubsubService')

const  myCronTask = async () => {
    console.log("CRONJOB TASK CALLED")
    try {
        const tutorials = await mockoonApi.getTutorials()
        console.log("TUTORIALS", tutorials);
        pubsubService.publicMessage(tutorials)
    } catch (error) {
        console.log("ERROR", error);
    }
}

exports.runCronJob = () => {
    console.log('cronjob start')
    cron.schedule('* * * * *', myCronTask);
}