import { Request, Response } from 'express';
import * as dbService from '../services/dbService';

export async function getBlogs(req: Request, res: Response) {
  try {
    const blogs = await dbService.getBlogs();
    return res.json(blogs);
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Failed to fetch blogs' });
  }
}

export async function createBlog(req: Request, res: Response) {
  try {
    const blog = await dbService.addBlog(req.body);
    return res.status(201).json(blog);
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Failed to create blog' });
  }
}

export async function updateBlog(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const blog = await dbService.updateBlog(id, req.body);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    return res.json(blog);
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Failed to update blog' });
  }
}

export async function deleteBlog(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const success = await dbService.deleteBlog(id);
    if (!success) return res.status(404).json({ error: 'Blog not found' });
    return res.json({ success: true });
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Failed to delete blog' });
  }
}
