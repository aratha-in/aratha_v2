import { Request, Response } from 'express';
import * as dbService from '../services/dbService';
import { validateLeadInput } from '../../../shared/validation';

export async function getLeads(req: Request, res: Response) {
  try {
    const leads = await dbService.getLeads();
    return res.json(leads);
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Failed to fetch leads' });
  }
}

export async function createLead(req: Request, res: Response) {
  try {
    const validation = validateLeadInput(req.body);
    if (!validation.isValid) {
      return res.status(400).json({ errors: validation.errors });
    }
    const lead = await dbService.addLead(req.body);
    return res.status(201).json(lead);
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Failed to submit lead' });
  }
}

export async function updateLeadStatus(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!status) return res.status(400).json({ error: 'Status is required' });
    const lead = await dbService.updateLeadStatus(id, status);
    if (!lead) return res.status(404).json({ error: 'Lead not found' });
    return res.json(lead);
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Failed to update lead status' });
  }
}
