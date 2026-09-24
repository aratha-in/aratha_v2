import { Request, Response } from 'express';
import * as dbService from '../services/dbService';

export async function getPortfolio(req: Request, res: Response) {
  try {
    const portfolio = await dbService.getPortfolio();
    return res.json(portfolio);
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Failed to fetch portfolio' });
  }
}

export async function createPortfolio(req: Request, res: Response) {
  try {
    const project = await dbService.addPortfolio(req.body);
    return res.status(201).json(project);
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Failed to create portfolio project' });
  }
}

export async function updatePortfolio(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const project = await dbService.updatePortfolio(id, req.body);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    return res.json(project);
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Failed to update portfolio project' });
  }
}

export async function deletePortfolio(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const success = await dbService.deletePortfolio(id);
    if (!success) return res.status(404).json({ error: 'Project not found' });
    return res.json({ success: true });
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Failed to delete portfolio project' });
  }
}
