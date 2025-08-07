const mongoose = require('mongoose');

const CitySchema = new mongoose.Schema({
    name: { type: String, required: true }
});

const StateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    cities: [{ type: String, required: true }]
});

const LocationSchema = new mongoose.Schema({
    country: { type: String, required: true },
    states: [StateSchema]
});

module.exports = mongoose.model('Location', LocationSchema);