import express from 'express'
import {test} from '../controllers/user.controller.js'  //  .. for go outside the folder then in another folder
import { verifyToken } from '../utils/verifyUser.js';
import { updateUser } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/test',test);
router.put('/update/:userId', verifyToken, updateUser);

export default router;