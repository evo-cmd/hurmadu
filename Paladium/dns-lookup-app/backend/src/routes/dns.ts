import { Router } from 'express';
import DNSController from '../controllers/dnsController';

const router = Router();
const dnsController = new DNSController();

router.post('/lookup', dnsController.lookupDomains.bind(dnsController));

export default router;