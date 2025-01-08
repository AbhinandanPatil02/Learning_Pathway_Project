const mongoose = require('mongoose');

const pathwaySchema = new mongoose.Schema({
    technology: String,
    pathway: Array,
});

module.exports = mongoose.model('Pathway', pathwaySchema);
