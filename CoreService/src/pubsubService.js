const { PubSub } = require('@google-cloud/pubsub')
const dotenv = require('dotenv')

dotenv.config()

const projectId = 'batchdatacrawler'

const topicName = 'my-topic'

const subcriptionName = 'tutorials'

const pubsubClient = new PubSub({projectId})

const handleMessage = (message) => {
    const data = message.data.toString()
    console.log('Received message:', data);
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