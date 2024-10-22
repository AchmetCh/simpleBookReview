const jwt = require("jsonwebtoken");
const User = require("../models/user");
const dotenv = require("dotenv");
dotenv.config();
const SALT_ROUNDS = +process.env.SALT_ROUNDS;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

exports.auth = (req,res,next) => {
    const token = req.header("isdjfjksd")
    if(!token) return res.status(401).send("Access denied. No token provided.")
        try {
    const decoded = jwt.verify(token,PRIVATE_KEY)
    req.user = decoded
    next()
    } catch (err) {
        res.status(400).send("Invalid token.")
        }
}