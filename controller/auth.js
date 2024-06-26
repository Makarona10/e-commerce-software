import { connection } from '../DB/index';
import { dataObj, failureMsg } from '../trait/api-traits';
import * as argon2 from 'argon2';
import jwt from 'jsonwebtoken';

export const registerController = async (req, res, next) => {
  const {
    user_type,
    email,
    password,
    first_name,
    last_name,
    mobile,
    location,
    store_name,
  } = req.body;

  const user = await connection.query(
    `SELECT email FROM ${user_type} WHERE email = $1 ;`,
    [email],
  );

  if (user) return res.json(failureMsg(409, 'Email already exists.'));

  const hashedPassword = await argon2.hash(password);
  const newUser = await connection.query(
    `INSERT INTO users(email, password, mobile, role)
    VALUES ($1, $2, $3, $4) ;`,
    [email, hashedPassword, mobile, user_type],
  );

  switch (user_type) {
    case 'client' || 'delivery_boy':
      await connection.query(
        `INSERT INTO ${user_type}(${user_type}_id, first_name, last_name ) VALUES ($1,$2,$3) ;`,
        [newUser.rows[0].id, first_name, last_name],
      );
      break;

    case 'merchant':
      await connection.query(
        `INSERT INTO ${user_type}(merchant_id, store_name, location)
        VALUES ($1,$2,$3) ;`,
        [newUser.rows[0].id, store_name, location],
      );
      break;

    default:
      throw Error('user_type not found');
  }

  res.json(dataObj(201, `${user_type} user created successfully`, newUser));
};

export const loginController = async (req, res, next) => {
  const { email, password, user_type } = req.body;
  const user = await connection.query(
    `SELECT password FROM ${user_type} WHERE email = $1 ;`,
    [email],
  );

  if (!user || !(await argon2.verify(user.rows[0].password, password)))
    return res.json(failureMsg(400, 'invalid email or password'));

  const payload = { id: user.rows[0].id, role: user.rows[0].role };
  const options = { expiresIn: process.env.JWT_EXPIRATION };
  let access_token = null;

  jwt.sign(payload, process.env.JWT_SECRET, options, (err, token) => {
    if (err) {
      return next(new Error('something went wrong, please try again'));
    }
    access_token = token;
  });
  res.json(dataObj(200, 'user logged in successfully', access_token));
};
