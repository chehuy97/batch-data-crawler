const express = require('express')
const dotenv = require('dotenv')
const cronJob = require('./cronJob')
const { subcribeToTopic } = require('./pubsubService')

dotenv.config()

const app =  express()

const cronJobTask = cronJob.runCronJob()

subcribeToTopic((message) => {
    const dataString = message.data.toString()
    const data = JSON.parse(dataString)
    if(data.cronJobStatus) {
        console.log("Stop cronjob");
        cronJobTask.stop()
    }
    message.ack();
})


const port = process.env.SERVER_HOST || '8002'

app.listen(port, () => {
    console.log("BATCH DATA SERVICE RUNNING ON PORT: ", port)
})

