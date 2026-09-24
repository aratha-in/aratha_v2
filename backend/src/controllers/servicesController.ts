import { Request, Response } from 'express';
import * as dbService from '../services/dbService';

export async function getServices(req: Request, res: Response) {
  try {
    const services = await dbService.getServices();
    return res.json(services);
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Failed to fetch services' });
  }
}

export async function createService(req: Request, res: Response) {
  try {
    const service = await dbService.addService(req.body);
    return res.status(201).json(service);
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Failed to create service' });
  }
}

export async function updateService(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const service = await dbService.updateService(id, req.body);
    if (!service) return res.status(404).json({ error: 'Service not found' });
    return res.json(service);
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Failed to update service' });
  }
}

export async function deleteService(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const success = await dbService.deleteService(id);
    if (!success) return res.status(404).json({ error: 'Service not found' });
    return res.json({ success: true });
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Failed to delete service' });
  }
}
