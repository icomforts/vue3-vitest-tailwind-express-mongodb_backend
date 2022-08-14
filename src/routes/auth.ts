import express from 'express';
import multer from 'multer';
import { createUser, loginUser } from '../controllers/auth';

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

const upload = multer({ storage: storage });

//user register with name and password and email and avatar
router.post('/register', upload.single('avatar'), createUser);
//user login with email and password
router.post('/login', loginUser);
export default router;
