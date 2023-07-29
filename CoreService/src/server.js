const express = require('express')
const dotenv = require('dotenv')
const pubsubService = require('./pubsubService')
const {startup, tutorial} = require('./db')

dotenv.config()

const app = express()

startup()

pubsubService.subcribeToTopic()

const port = process.env.SERVER_HOST || '8001'

app.listen(port, () => {
    console.log("CORE SERVICE RUNNING ON PORT: ", port)
})

