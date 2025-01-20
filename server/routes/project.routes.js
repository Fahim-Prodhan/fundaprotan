// routes/projects.js

import express from 'express';
import { addProject ,getProjects,updateProject,deleteProject,getProjectsCount,getDetailsProject } from '../controllers/project.controller.js';
import verifyAdmin from "../middleware/verifyAdmin.js";
const router = express.Router();

router.post('/projects',verifyAdmin, addProject);
router.get('/projects', getProjects);
router.put('/update/:id',verifyAdmin, updateProject);
router.delete('/delete/:id',verifyAdmin, deleteProject);
router.get('/countProject',verifyAdmin,getProjectsCount)
router.get('/details/:id',getDetailsProject)


export default router;
