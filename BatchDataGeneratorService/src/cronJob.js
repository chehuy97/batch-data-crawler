const cron = require('node-cron');
const mockoonApi = require('./mockoonAPI')
const pubsubService = require('./pubsubService')

const  myCronTask = async () => {
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
    const cronJob = cron.schedule('* * * * *', myCronTask);
    return cronJob
}