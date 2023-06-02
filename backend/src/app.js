import express, { json } from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./routes/users-router.js";
import multer from "multer";
// import { nanoid } from "nanoid";
import { v4 as uuidv4 } from "uuid";
import cloudinary from "cloudinary";
import "./config/cloudinary-config.js";
import userRoleRouter from "./routes/userRole-router.js";
import { signInUser, signUpUser } from "./services/users-service.js";
import createRestaurant, {
  findNearest,
} from "./services/restaurant-service.js";

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
    const fileName = uuidv4();
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
app.use("/api/userRole", userRoleRouter);

app.post("/api/signup", async (req, res) => {
  const { email, password, repassword } = req.body;
  if (password !== repassword) {
    return res
      .status(400)
      .json({ success: false, message: "Password did not match" });
  }
  const user = await signUpUser({ email, password });
  console.log(user);
  return res.status(200).json({ success: true, message: "Sign Up successful" });
});

app.post("/api/signin", async (req, res) => {
  const { email, password } = req.body;
  const response = await signInUser({ email, password });
  res.status(response.status).json(response);
});

app.post("/files", upload.single("image"), async (req, res) => {
  const uploadedFile = await cloudinary.v2.uploader.upload(req.file.path);
  res.json(uploadedFile);
});

app.use("/uploads/", express.static("uploads"));

app.get("/api", (req, res) => {
  res.json("hi");
});

app.post("/restaurants", async (req, res) => {
  const { name, location } = req.body;
  const response = await createRestaurant({ name, location });
  res.json(response);
});

app.get("/restaurants", async (req, res) => {
  const { longitude, latitude } = req.body;
  const response = await findNearest([longitude, latitude]);
  res.json(response);
});

app.listen(PORT, () => {
  console.log("http://localhost:" + PORT);
});
