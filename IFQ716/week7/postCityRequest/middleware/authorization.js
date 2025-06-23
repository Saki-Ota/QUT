const jwt = require("jsonwebtoken");
const helmet = require("helmet");

// cookie method for JWT authentication
// module.exports = function (req, res, next) {
//   // Cookieからトークンを取得
//   const token = req.cookies.token;

//   console.log("Received token from cookie:", token);

//   if (!token) {
//     return res.status(401).json({
//       error: true,
//       message: "JWT token not found in cookies",
//     });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // デコード結果をリクエストに保存（必要なら）
//     next();
//   } catch (e) {
//     if (e.name === "TokenExpiredError") {
//       res.status(401).json({ error: true, message: "JWT token has expired" });
//     } else {
//       res.status(401).json({ error: true, message: "Invalid JWT token" });
//     }
//   }
// };

module.exports = function (req, res, next) {
    if(!("authorization" in req.headers)
       || !req.headers.authorization.startsWith(/^Bearer /)) {
        return res.status(401).json({ error: true, message: "Authorization header is missing" });
    }
    const token = req.headers.authorization.replace(/^Bearer /, "");
    try {
        jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
        if (e.name === "TokenExpiredError") {
            return res.status(401).json({ error: true, message: "JWT token has expired" });
        } else {
            return res.status(401).json({ error: true, message: "Invalid JWT token" });
        }
        return;
    }
    next();
}
