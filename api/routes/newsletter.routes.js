// routes/newsletter.routes.js
import { Router } from 'express';
import { subscribe, check, unsubscribe } from '../controllers/newsletter.controller.js';


const router = Router();

// POST /api/newsletter/subscribe
router.post('/subscribe', subscribe);

// GET /api/newsletter/check?email=you@example.com
router.get('/check', check);

// POST /api/newsletter/unsubscribe
router.post('/unsubscribe', unsubscribe);

export default router;