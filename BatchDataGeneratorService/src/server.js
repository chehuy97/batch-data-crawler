const express = require('express')
const dotenv = require('dotenv')
const cronJob = require('./cronJob')

dotenv.config()

const app =  express()

cronJob.runCronJob()

const port = process.env.SERVER_HOST || '8003'

app.listen(port, () => {
    console.log("BATCH DATA SERVICE RUNNING ON PORT: ", port)
})

