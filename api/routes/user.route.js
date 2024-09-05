import express from 'express'
import {test} from '../controllers/user.controller.js'  //  .. for go outside the folder then in another folder

const router = express.Router();

router.get('/test',test);

export default router;