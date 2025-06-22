const jwt = require("jsonwebtoken");
const helmet = require("helmet");

module.exports = function (req, res, next) {
  // Cookieからトークンを取得
  const token = req.cookies.token;

  console.log("Received token from cookie:", token);

  if (!token) {
    return res.status(401).json({
      error: true,
      message: "JWT token not found in cookies",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // デコード結果をリクエストに保存（必要なら）
    next();
  } catch (e) {
    if (e.name === "TokenExpiredError") {
      res.status(401).json({ error: true, message: "JWT token has expired" });
    } else {
      res.status(401).json({ error: true, message: "Invalid JWT token" });
    }
  }
};
