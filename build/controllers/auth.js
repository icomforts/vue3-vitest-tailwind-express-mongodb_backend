"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.createUser = void 0;
const user_1 = __importDefault(require("../models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const fs_1 = __importDefault(require("fs"));
const deleteFile = (path) => {
    fs_1.default.unlink(path, (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('file removed');
    });
};
//create a new user
const createUser = async (req, res, next) => {
    const salt = await bcrypt_1.default.genSalt(10);
    const hashedPass = await bcrypt_1.default.hash(req.body.password, salt);
    req.body.password = hashedPass;
    const imagePath = `./public/images/${req.file?.filename}`;
    try {
        const oldUser = await user_1.default.findOne({ email: req.body.email });
        if (oldUser) {
            deleteFile(imagePath);
            return res.status(400).json({ message: '此Email已註冊過!' });
        }
        const newUser = new user_1.default({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            avatar: req.file?.filename || ''
        });
        const user = await newUser.save();
        const token = jsonwebtoken_1.default.sign({ _id: user._id }, process.env.JWT_SECRET);
        res.status(200).json({ user, token });
    }
    catch (err) {
        deleteFile(imagePath);
        res.status(500).json({ error: err });
    }
};
exports.createUser = createUser;
//user login
const loginUser = async (req, res, next) => {
    try {
        const user = await user_1.default.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ message: '沒有這個人~' });
        }
        const isMatch = await bcrypt_1.default.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: '密碼不對~' });
        }
        const token = jsonwebtoken_1.default.sign({ _id: user._id }, process.env.JWT_SECRET);
        res.status(200).json({ user, token });
        next();
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
};
exports.loginUser = loginUser;
