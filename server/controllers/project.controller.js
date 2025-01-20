// controllers/projectController.js

import Project from '../models/project.model.js';

export const addProject = async (req, res) => {
    const { title, description, imageUrl } = req.body;

    try {
        const newProject = new Project({ title, description, imageUrl });
        await newProject.save();
        res.status(201).json(newProject);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};


export const getProjects = async (req, res) => {
    const { page = 1, limit = 10, search = '' } = req.query;
    const pageNumber = parseInt(page);
    const pageSize = parseInt(limit);
    const searchQuery = search ? { title: { $regex: search, $options: 'i' } } : {};

    try {
        const projects = await Project.find(searchQuery)
            .sort({_id: -1})
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize);
        const totalCount = await Project.countDocuments(searchQuery);

        res.json({ projects, totalCount });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const updateProject = async (req, res) => {
    const { id } = req.params;
    const { title, description, imageUrl } = req.body;

    try {
        const updatedProject = await Project.findByIdAndUpdate(id, { title, description, imageUrl }, { new: true });
        if (!updatedProject) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.json(updatedProject);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
export const deleteProject = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedProject = await Project.findByIdAndDelete(id);
        if (!deletedProject) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.json({ message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getProjectsCount = async (req, res) =>{
    try {
        // Count the documents in the User collection
        const count = await Project.countDocuments();
        // Send the count as the response
        res.send({ count });
      } catch (error) {
        // Handle any errors that occur during the count operation
        console.error('Error counting user documents:', error);
        res.status(500).send('Internal Server Error');
      }
}

export const getDetailsProject = async (req, res) => {
    const { id } = req.params;
    try {
      const project = await Project.findById(id);
      if (!project) {
        return res.status(404).send({ message: "project not found" });
      }
      res.status(200).send(project);
    } catch (error) {
      console.error("Error fetching project details:", error);
      res
        .status(500)
        .send({ message: "An error occurred while fetching project details" });
    }
  };
  
