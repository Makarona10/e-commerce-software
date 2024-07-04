import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  const token = req.headers.authorization.startsWith('Bearer ') ? req.headers.authorization.substring(7) : req.headers.authorization;
  console.log(token);
  if (!token) {
    console.log("token should be provided");
    return res.status(401).json({msg: "No token provided!"});
  }
  jwt.verify(token, process.env.JWT_ACC_SECRET, (err, decoded) => {
    if (err) {
      console.log("Token error baby" ,err);
      return;
    }
    req.user_id = decoded.user_id;
  });
  next();
};

export { auth };
