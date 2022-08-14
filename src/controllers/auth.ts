import { Request, Response, NextFunction } from 'express';
import User from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import fs from 'fs';

const deleteFile = (path: string) => {
    fs.unlink(path, (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('file removed');
    });
};

//create a new user
export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPass;
    const imagePath = `./public/images/${req.file?.filename}`;
    try {
        const oldUser = await User.findOne({ email: req.body.email });
        if (oldUser) {
            deleteFile(imagePath);
            return res.status(400).json({ message: '此Email已註冊過!' });
        }
        const newUser = new User({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            avatar: req.file?.filename || ''
        });
        const user = await newUser.save();
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET as string);
        res.status(200).json({ user, token });
    } catch (err) {
        deleteFile(imagePath);
        res.status(500).json({ error: err });
    }
};

//user login
export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ message: '沒有這個人~' });
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: '密碼不對~' });
        }
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET as string);
        res.status(200).json({ user, token });
        next();
    } catch (err) {
        res.status(500).json({ error: err });
    }
};
