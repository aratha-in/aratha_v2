import { Request, Response } from 'express';
import * as dbService from '../services/dbService';

export async function getBlogs(req: Request, res: Response) {
  try {
    const blogs = await dbService.getBlogs();
    return res.json(blogs);
  } catch (error) {
    console.error("Failed to fetch blog records:", error);
    return res.status(500).json({ error: "Failed to fetch blogs" });
  }
}
