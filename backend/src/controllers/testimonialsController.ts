import { Request, Response } from 'express';
import * as dbService from '../services/dbService';

export async function getTestimonials(req: Request, res: Response) {
  try {
    const testimonials = await dbService.getTestimonials();
    return res.json(testimonials);
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Failed to fetch testimonials' });
  }
}

export async function createTestimonial(req: Request, res: Response) {
  try {
    const testimonial = await dbService.addTestimonial(req.body);
    return res.status(201).json(testimonial);
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Failed to create testimonial' });
  }
}

export async function updateTestimonial(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const testimonial = await dbService.updateTestimonial(id, req.body);
    if (!testimonial) return res.status(404).json({ error: 'Testimonial not found' });
    return res.json(testimonial);
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Failed to update testimonial' });
  }
}

export async function deleteTestimonial(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const success = await dbService.deleteTestimonial(id);
    if (!success) return res.status(404).json({ error: 'Testimonial not found' });
    return res.json({ success: true });
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Failed to delete testimonial' });
  }
}
