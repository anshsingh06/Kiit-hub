const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  // Get token from header
  const authHeader = req.headers['authorization']; // usually: "Bearer <token>"
  const token = authHeader && authHeader.split(' ')[1]; // get the token part

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = { id: decoded.userId, role: decoded.role };

  if (!token) {
    return res.status(401).json({ message: 'Access token missing' });
  }

  // Verify token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user; // attach decoded user info to req
    next();
  });
}


module.exports = authenticateToken;
