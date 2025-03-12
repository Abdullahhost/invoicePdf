import ejs from "ejs";

import puppeteer from "puppeteer";
import convertor from "number-to-words";
import { v4 as uuidv4 } from "uuid";

import path from "path";

export const generateInvoicePdfHelper = async (dynamicArray) => {
  const totalSale = dynamicArray.reduce((sum, currentPassenger) => {
    return sum + currentPassenger.sale;
  }, 0);

  const totalCost = dynamicArray.reduce((sum, currentPassenger) => {
    return sum + currentPassenger.cost;
  }, 0);

  const profit = totalSale - totalCost;
  const amountinWords = convertor.toWords(totalSale);

  const uniqueId = uuidv4();
  const date = new Date();
  const options = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };

  const formattedDate = date.toLocaleDateString("en-GB", options);
  
  const html = await ejs.renderFile(
    path.join(process.cwd(), "views/templates/invoice.ejs"),
    {
      data: dynamicArray,
      formattedDate,
      uniqueId,
      profit,
      amountinWords,
      totalSale,
      totalCost,
    }
  );
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(html);
    const outputPath = path.join(process.cwd(), "output", "invoice.pdf");

    await page.pdf({
      path: outputPath,
      format: "A4",
      printBackground: true,
      margin: { top: "2cm", bottom: "2cm", left: "1cm", right: "1cm" },
      preferCSSPageSize: true,
    });
    await browser.close();
  } catch (err) {
    console.error("Error generating PDF:", err);
  }
};
