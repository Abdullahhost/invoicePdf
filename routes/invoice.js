import express from "express";
import { generateInvoicePdf } from "../controller/invoice.create.js";

const router = express.Router();
router.get("/", generateInvoicePdf);

export default router;
