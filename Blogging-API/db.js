const moogoose = require('mongoose');
require('dotenv').config();
const MONGODB_URI = process.env.MONGODB_URI;

// In order to connect to mongodb
function connectToMongoDB() {
    moogoose.connect(MONGODB_URI);

    moogoose.connection.on('connected', () => {
        console.log('Successfully connected to MongoDB');
    });

    moogoose.connection.on('error', (err) => {
        console.log('There was error connecting to MongoDB', err);
    })
}

module.exports = { connectToMongoDB };