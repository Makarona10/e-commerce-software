import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    console.log("token should be provided");
    return res.status(401).json({msg: "No token provided!"});
  }
  jwt.verify(token, process.env.JWT_ACC_SECRET, (err, decoded) => {
    if (err) {
      console.log(err);
      return;
    }
    req.user_id = decoded.user_id;
  });
  next();
};

export { auth };
