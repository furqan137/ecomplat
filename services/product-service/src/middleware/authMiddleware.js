const jwt = require("jwt-simple")

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]
  if (!token) return next()

  try {
    const decoded = jwt.decode(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (err) {
    next()
  }
}

const requireRole = (role) => {
  return (req, res, next) => {
    if (!req.user || (req.user.role !== role && req.user.role !== "admin")) {
      return res.status(403).json({ error: "Insufficient permissions" })
    }
    next()
  }
}

module.exports = { verifyToken, requireRole }
