import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  const token = req.headers.authorization;
  jwt.verify(token, secretkey, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Invalid token' });
    req.user_id = decoded.user_id;
  });
  next();
};

export { auth };
