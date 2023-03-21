import express, { json } from "express";
import cors from "cors";
const app = express();
app.use(json());
app.use(cors());
const PORT = 8050;

app.get("/api", (req, res) => {
  res.json("hi");
});

app.listen(PORT, () => {
  console.log("http://localhost:" + PORT);
});
