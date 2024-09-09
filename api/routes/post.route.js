import express from 'express';
import {verifyToken} from '../utils/verifyUser.js'
import { create, getPosts } from '../controllers/post.controller.js';

const router = express.Router();

router.post('/create', verifyToken,create)
router.get('/getposts',getPosts)     // end user can search for the post without token so no need for verifytoken


export default router;