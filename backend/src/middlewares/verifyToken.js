import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(401).json({ success: false, message: "Token required" });
  }

  try {
    const decoded = jwt.verify(token, "SecretToken-Key");
    req.user = decoded;
  } catch (e) {
    console.error(e.message);
    res.status(401).json({ success: false, message: "User is not found" });
  }
  return next();
};

export default verifyToken;
