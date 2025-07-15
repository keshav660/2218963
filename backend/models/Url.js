const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    longUrl: { type: String, required: true },
    shortCode: { type: String, required: true, unique: true },
    expiry: { type: Date, required: true },
    clicks: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    clickData: [{
        timestamp: { type: Date, default: Date.now },
        source: { type: String },
        location: { type: String }
    }]
});

module.exports = mongoose.model('Url', urlSchema);
