const bcrypt = require("bcrypt");
const Users = require("../models/User");
var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken")

router.post("/signUp", async (req, res) => {
    try {
        const {password, erp } = req.body

        let user = await Users.findOne({ erp })
        if (user) return res.json({ msg: "USER EXISTS" })

        await Users.create({ ...req.body, password: await bcrypt.hash(password, 5), });

        return res.json({ msg: "CREATED" })
    } catch (error) {
        console.error(error)
    }
});

router.post("/login", async (req, res) => {
    try {
        const { erp, password } = req.body

        const user = await Users.findOne({ erp })
        if (!user) return res.json({ msg: "USER NOT FOUND" })

        const passwordCheck = await bcrypt.compare(password, user.password);
        if (!passwordCheck) return res.json({ msg: "WRONG PASSWORD" })

        const token = jwt.sign({
            erp: user.erp,
            createdAt: new Date(),
        }, "MY_SECRET", { expiresIn: "1d" });

        res.json({
            msg: "LOGGED IN", erp, token
        })
    } catch (error) {
        console.error(error)
    }
});

module.exports = router
