import { Request, Response } from 'express';
import * as dbService from '../services/dbService';

export async function getSeo(req: Request, res: Response) {
  try {
    const seo = await dbService.getSeoConfigs();
    return res.json(seo);
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Failed to fetch SEO configuration' });
  }
}

export async function updateSeo(req: Request, res: Response) {
  try {
    const { page, title, description, keywords } = req.body;
    if (!page) return res.status(400).json({ error: 'Page identifier is required' });
    const seo = await dbService.updateSeoConfig(page, { title, description, keywords });
    return res.json(seo);
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Failed to update SEO configuration' });
  }
}
