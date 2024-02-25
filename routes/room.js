const Users = require("../models/User");
const Rooms = require("../models/Room");
var express = require("express");
var router = express.Router();

router.post("/getRoomNumber", async (req, res) => {
    try {
        const room = await Rooms.findOne({ roomNumber: req.body.roomNumber })
        if (!room) return res.json({ msg: "ROOM NOT FOUND" })
        res.json({ msg: "ROOM FOUND", data: room })
    } catch (error) {
        console.error(error)
    }
});

router.post("/getByRoomNumberWithUser", async (req, res) => {
    try {
        const room = await Rooms.findOne({ roomNumber: req.body.roomNumber }).populate('user')
        if (!room) return res.json({ msg: "ROOM NOT FOUND" })
        res.json({ msg: "ROOM FOUND", data: room })
    } catch (error) {
        console.error(error)
    }
});

router.post("/addRoom", async (req, res) => {
    try {
        const user = await Users.findOne({ erp: req.body.erp })
        if (!user) return res.json({ msg: "USER NOT FOUND" })
        const room = await Rooms.findOne({user:user._id})
        if(room) return res.json({msg:"Room already exists with this ERP"})
        await Rooms.create({...req.body, user: user._id  })
        res.json({ msg: "ROOM ADDED" })
    } catch (error) {
        console.error(error)
    }
});

router.post("/deleteByRoomNumber", async (req, res) => {
    try {
        const room = await Rooms.findOne({ roomNumber: req.body.roomNumber })
        if (!room) return res.json({ msg: "ROOM NOT FOUND" })
        await Rooms.deleteOne({ roomNumber: req.body.roomNumber })
        res.json({ msg: "ROOM DELETED" })
    } catch (error) {
        console.error(error)
    }
});

module.exports = router
