import express from 'express';
import { deleteUser, test, updatePassword, updateUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get("/test", test);
router.post("/update/:id",verifyToken ,updateUser);
router.post("/updatePassword/:id",verifyToken ,updatePassword);
router.delete("/delete/:id",verifyToken ,deleteUser);

export default router;