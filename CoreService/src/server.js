const express = require('express')
const dotenv = require('dotenv')
const pubsubService = require('./pubsubService')

dotenv.config()

const app = express()

pubsubService.subcribeToTopic()

const port = process.env.SERVER_HOST || '8001'

app.listen(port, () => {
    console.log("CORE SERVICE RUNNING ON PORT: ", port)
})

