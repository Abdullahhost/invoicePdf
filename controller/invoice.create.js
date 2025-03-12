import { generateInvoicePdfHelper } from "../helper/invoice.js";
import path from "path";
import { passenger } from "../data/invoice.js";

export const generateInvoicePdf = async (req, res) => {
  try {
    await generateInvoicePdfHelper(passenger);

    res.sendFile(path.join(process.cwd(), "output/invoice.pdf"));
  } catch (err) {
    console.log(err);
  }
};
