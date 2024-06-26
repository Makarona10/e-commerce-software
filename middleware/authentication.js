import jwt from 'jsonwebtoken';
import { failureMsg } from '../trait/api-traits.js';

const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token)
    return res.status(400).json(failureMsg(400, 'token should be provided'));
  jwt.verify(token, secretkey, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Invalid token' });
    req.user_id = decoded.user_id;
  });
  next();
};

export { auth };
