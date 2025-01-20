// routes/blogRoutes.js

import express from 'express';
import {getCheckoutSession ,handleSuccess,getUserPaymentHistory,getAllInvoice,getInvoice} from '../controllers/donate.controller.js'
import protectRoute from "../middleware/protectRoute.js";
import verifyAdmin from '../middleware/verifyAdmin.js';
const router = express.Router();

router.post('/cheakout',protectRoute,getCheckoutSession);
router.post('/success',handleSuccess );
router.get('/payment-history/:id',protectRoute,getUserPaymentHistory);
router.get('/invoice/:id',protectRoute,getInvoice);
router.get('/invoices',verifyAdmin,getAllInvoice);


export default router;
