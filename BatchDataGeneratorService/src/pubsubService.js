const { PubSub } = require('@google-cloud/pubsub')
const dotenv = require('dotenv')

dotenv.config()

const projectId = 'batchdatacrawler'

const topicName = 'my-topic'

const topicStopBatchDataName = 'stop-batch-data-topic'

const subcriptionStopBatchDataName = 'stop-batch-data-sub'

const pubsubClient = new PubSub({projectId})

exports.publicMessage = async (message) => {
    try {
        const data = JSON.stringify(message)
        const messageId = await pubsubClient.topic(topicName).publishMessage({data: Buffer.from(data)})
        console.log(`Message ${messageId} published.`);
    } catch (error) {
        console.error('Error publishing message:', error);
    }
}

exports.subcribeToTopic = async (handleMessage) => {
    try {
        const subscription = await pubsubClient.topic(topicStopBatchDataName).subscription(subcriptionStopBatchDataName)
        console.log(`Subscription ${subscription.name}`);
        subscription.on('message', handleMessage);
    } catch (error) {
        console.error('Error creating subscription:', error);
    }
}




