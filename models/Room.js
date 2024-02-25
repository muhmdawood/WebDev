const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    roomNumber: Number,
    block: String,
    building: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Rooms = mongoose.model('Rooms', RoomSchema);

module.exports = Rooms;