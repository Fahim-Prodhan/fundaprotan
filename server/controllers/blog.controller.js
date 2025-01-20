// controllers/blogController.js

import Blog from "../models/blog.model.js";

export const addBlog = async (req, res) => {
  try {
    const { title, description, imageUrl } = req.body;
    const blog = new Blog({
      title,
      description,
      imageUrl,
    });
    const savedBlog = await blog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getBlogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Current page number, default is 1
    const limit = parseInt(req.query.limit) || 10; // Number of blogs per page, default is 10
    const search = req.query.search || ""; // Search term, default is empty

    // Constructing query based on search term
    const query = search ? { title: { $regex: search, $options: "i" } } : {};

    // Counting total number of blogs for pagination
    const count = await Blog.countDocuments(query);

    // Fetching blogs for the current page with pagination
    const blogs = await Blog.find(query)
      .sort({ _id: -1 })
      .limit(limit)
      .skip((page - 1) * limit);

    res.json({ blogs, totalPages: Math.ceil(count / limit) });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update an existing blog
export const updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, description, imageUrl } = req.body;

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { title, description, imageUrl },
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.json({ message: "Blog updated successfully", blog: updatedBlog });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete a blog
export const deleteBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getBlogsCount = async (req, res) => {
  try {
    // Count the documents in the User collection
    const count = await Blog.countDocuments();
    // Send the count as the response
    res.send({ count });
  } catch (error) {
    // Handle any errors that occur during the count operation
    console.error("Error counting user documents:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const getDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).send({ message: "Blog not found" });
    }
    res.status(200).send(blog);
  } catch (error) {
    console.error("Error fetching blog details:", error);
    res
      .status(500)
      .send({ message: "An error occurred while fetching blog details" });
  }
};
