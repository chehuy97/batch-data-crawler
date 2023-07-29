const { PubSub } = require('@google-cloud/pubsub')
const dotenv = require('dotenv')
const { tutorial } = require('./db')

dotenv.config()

const projectId = 'batchdatacrawler'

const topicName = 'my-topic'

const topicStopBatchDataName = 'stop-batch-data-topic'

const subcriptionName = 'tutorials'

const pubsubClient = new PubSub({ projectId })

const publishMessageStopBatchData = async (message) => {
    try {
        const data = JSON.stringify(message)
        const messageId = await pubsubClient.topic(topicStopBatchDataName).publishMessage({ data: Buffer.from(data) })
        console.log(`Message ${messageId} published.`);
    } catch (error) {
        console.error('Error publishing message:', error);
    }
}

const createTutorials = async (arrTotorials) => {
    try {
        await tutorial.bulkCreate(arrTotorials)
        const tutorials = await tutorial.findAll()
        console.log("Tutorial length", tutorials.length)
        if(tutorials.length >= 1600) {
            publishMessageStopBatchData({cronJobStatus: "stop"})
        }
    } catch (error) {
        console.log("Fail:", error);
    }
}

const handleMessage = (message) => {
    const dataString = message.data.toString()
    const data = JSON.parse(dataString)
    createTutorials(data)
    message.ack();
}

exports.subcribeToTopic = async () => {
    try {
        const subscription = await pubsubClient.topic(topicName).subscription(subcriptionName)
        console.log(`Subscription ${subscription.name}`);
        subscription.on('message', handleMessage);
    } catch (error) {
        console.error('Error creating subscription:', error);
    }
}