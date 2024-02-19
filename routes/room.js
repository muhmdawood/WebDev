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
        const room = await Rooms.findOne({ roomNumber: req.body.roomNumber }).populate("user")
        if (!room) return res.json({ msg: "ROOM NOT FOUND" })
        res.json({ msg: "ROOM FOUND", data: room })
    } catch (error) {
        console.error(error)
    }
});

/******* below are all the routes that WILL NOT pass through the middleware ********/

router.use((req, res, next) => {
    if (!req.user.admin) return res.json({ msg: "NOT ADMIN" })
    else next()
})

/******* below are all the routes that WILL pass through the middleware ********/

router.post("/addRoom", async (req, res) => {
    try {
        const user = await Users.findOne({ email: req.body.email })
        if (!user) return res.json({ msg: "USER NOT FOUND" })
        await Rooms.create({ ...req.body, user: user._id })
        res.json({ msg: "ROOM ADDED" })
    } catch (error) {
        console.error(error)
    }
});

router.post("/deleteByRoomNumber", async (req, res) => {
    try {
        const room = await Rooms.findOne({ roomNumber: req.body.roomNumber })
        if (!room) return res.json({ msg: "ROOM NOT FOUND" })
        await Rooms.deleteOne({ isbn: req.body.roomNumber })
        res.json({ msg: "ROOM DELETED" })
    } catch (error) {
        console.error(error)
    }
});

module.exports = router
