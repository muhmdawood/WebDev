const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    roomNumber: Number,
    block: String,
    building: String,
    user: { type: mongoose.SchemaTypes.ObjectId, ref: 'Users' },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Rooms = mongoose.model('Books', RoomSchema);

module.exports = Rooms;