import { Router } from 'express';
import * as leadsController from '../controllers/leadsController';

const router = Router();

router.get('/', leadsController.getLeads);
router.post('/', leadsController.createLead);
router.put('/:id', leadsController.updateLeadStatus);

export default router;
