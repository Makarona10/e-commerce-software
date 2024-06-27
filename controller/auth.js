import { connection } from '../DB/index.js';
import { dataObj, failureMsg } from '../trait/api-traits.js';
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
    `SELECT email FROM ${user_type}s WHERE email = $1 ;`,
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

  res.json(dataObj(201, newUser, `${user_type} user created successfully`));
};

export const loginController = async (req, res, next) => {
  const { email, password, user_type } = req.body;
  const user = await connection.query(
    `SELECT password FROM ${user_type} WHERE email = $1 ;`,
    [email],
  );

  if (!user || !(await argon2.verify(user.rows[0].password, password)))
    return res.json(failureMsg(400, 'invalid email or password'));

  const payload = { user_id: user.rows[0].id, role: user.rows[0].role };
  const options = { expiresIn: process.env.JWT_ACC_EXPIRATION };
  let access_token = null;

  jwt.sign(payload, process.env.JWT_ACC_SECRET, options, (err, token) => {
    if (err) {
      return next(new Error('something went wrong, please try again'));
    }
    access_token = token;
  });

  let refresh_token = null;
  jwt.sign(
    { user_id: user.rows[0].id },
    process.env.JWT_REF_SECRET,
    { expiresIn: process.env.JWT_REF_EXPIRATION },
    (err, token) => {
      if (err) {
        return next(new Error('something went wrong, please try again'));
      }
      refresh_token = token;
    },
  );
  res.json(
    dataObj(
      200,
      [{ access_token, refresh_token }],
      'user logged in successfully',
    ),
  );
};
