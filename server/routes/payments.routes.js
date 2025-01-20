import express from 'express';
import { createPayment,handleSuccess } from '../controllers/payment.controller.js';
import protectRoute from "../middleware/protectRoute.js";


const router = express.Router();

router.post('/create-payment',protectRoute, createPayment)
router.get('/pay-success',handleSuccess)


export default router