// api/routes/contact.routes.js
import { Router } from 'express';
import { createContact } from '../controllers/contact.controller.js';

const router = Router();

// POST /api/contact
router.post('/', createContact);

export default router;
