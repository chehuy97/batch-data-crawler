const axios = require('axios')

exports.getTutorials = async () => {
    try {
        const response = await axios.get(`${process.env.MOCKOON_HOST}/tutorials`)
        return response.data
    } catch (error) {
        return null
    }
}