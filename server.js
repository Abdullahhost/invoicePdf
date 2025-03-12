import express from "express";
import {} from "dotenv/config";

import generateInvoice from "./routes/invoice.js";
import path from "path";

const app = express();

const __dirname = path.resolve();
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "views", "templates"));

app.use(express.static(path.join(process.cwd(), "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));

const port = process.env.PORT || 8001;
app.use("/invoice", generateInvoice);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
