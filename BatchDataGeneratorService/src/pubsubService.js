const { PubSub } = require('@google-cloud/pubsub')
const dotenv = require('dotenv')

dotenv.config()

const projectId = 'batchdatacrawler'

const topicName = 'my-topic'

const pubsubClient = new PubSub({projectId})

exports.publicMessage = async (message) => {
    try {
        const data = JSON.stringify(message)
        const messageId = await await pubsubClient.topic(topicName).publishMessage({data: Buffer.from(data)})
        console.log(`Message ${messageId} published.`);
    } catch (error) {
        console.error('Error publishing message:', error);
    }
}




