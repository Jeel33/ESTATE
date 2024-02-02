import express from 'express';
import { test, updatePassword, updateUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get("/test", test);
router.post("/update/:id",verifyToken ,updateUser);
router.post("/updatePassword/:id",verifyToken ,updatePassword);

export default router;