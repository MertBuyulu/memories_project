//dependencies
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
// routes
import postRoutes from "./routes/posts.js";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/posts", postRoutes);

const CONNECTION_URL =
  "mongodb+srv://admin:Sivastanbul5854@memories-app-cluster.2sn97r7.mongodb.net/?retryWrites=true&w=majority";

const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () => console.log(`Server is running on ${PORT}`))
  )
  .catch((error) => console.log(`${error} did not connect`));
