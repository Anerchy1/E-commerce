import express, { json } from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./routes/users-router.js";
import multer from "multer";
import { nanoid } from "nanoid";
import cloudinary from "cloudinary";
import "./config/cloudinary-config.js";

const PORT = 8050;
const app = express();
app.use(json());
app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    //hadgalah zamiig zaaj ugch baina
    cb(null, "/tmp");
  },
  filename: (req, file, cb) => {
    //hadgalah neriig random bolgon solij baina
    const fileName = nanoid();
    const splittedPath = file.originalname.split(".");
    const fileExtension = splittedPath[splittedPath.length - 1];
    console.log(fileExtension);
    cb(null, `${fileName}.${fileExtension}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const mimeType = file.mimetype;
    //hadgalna
    const fileSize = req.headers["content-length"];
    console.log("file.fileSize", fileSize);
    if (
      mimeType.includes("image") ||
      (mimeType.includes("video") && fileSize <= 10 * 1024 * 1024)
    ) {
      cb(null, true);
    } else {
      // hadgalkue
      cb(null, false);
    }
  },
});

const MONGO_CONNECTION_STRING =
  "mongodb+srv://Anerchy:Ilove775553@anerchy.6p45pgt.mongodb.net/Green";

mongoose
  .connect(MONGO_CONNECTION_STRING)
  .then(() => {
    console.log(`Connected to MongoDB`);
  })
  .catch((err) => {
    console.error(`Could not connect to MongoDB`, err);
  });

app.use(express.json());
app.use("/api/users", userRouter);

app.post("/files", upload.single("image"), async (req, res) => {
  const uploadedFile = await cloudinary.v2.uploader.upload(req.file.path);
  res.json(uploadedFile);
});

app.use("/uploads/", express.static("uploads"));

app.get("/api", (req, res) => {
  res.json("hi");
});

app.listen(PORT, () => {
  console.log("http://localhost:" + PORT);
});
