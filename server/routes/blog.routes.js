// routes/blogRoutes.js

import express from 'express';
import { addBlog ,getBlogs ,updateBlog, deleteBlog,getBlogsCount,getDetails } from '../controllers/blog.controller.js';
import verifyAdmin from "../middleware/verifyAdmin.js";
const router = express.Router();

// POST /api/blogs
router.post('/',verifyAdmin, addBlog);
router.get('/', getBlogs);
router.put('/update/:id',verifyAdmin, updateBlog);
router.delete('/delete/:id',verifyAdmin, deleteBlog);
router.get('/countBlog',verifyAdmin,getBlogsCount)
router.get('/details/:id', getDetails)


export default router;
