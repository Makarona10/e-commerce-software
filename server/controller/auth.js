import { delivery_table } from '../DB/delivery.js';
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
    national_id,
  } = req.body;

  try {
    connection.query('BEGIN');
    const user = await connection.query(
      `SELECT email FROM users WHERE email = $1;`,
      [email],
    );

    if (user.rows[0]) return res.json(failureMsg(409, 'Email already exists.'));

    const hashedPassword = await argon2.hash(password);
    const newUser = await connection.query(
      `INSERT INTO users(email, password, phone_number, role)
    VALUES ($1, $2, $3, $4)
    RETURNING *;`,
      [email, hashedPassword, mobile, user_type],
    );
    switch (user_type) {
      case 'client':
        await connection.query(
          `INSERT INTO clients (client_id, first_name, last_name)
          VALUES ($1,$2,$3);`,
          [newUser.rows[0].id, first_name, last_name],
        );
        break;

      case 'delivery_boy':
        await connection.query(
          `INSERT INTO delivery_boys (delivery_id, first_name, last_name, national_id)
          VALUES ($1,$2,$3,$4);`,
          [newUser.rows[0].id, first_name, last_name, national_id],
        );
        break;

      case 'merchant':
        await connection.query(
          `INSERT INTO ${user_type}s (merchant_id, store_name, location)
          VALUES ($1,$2,$3) ;`,
          [newUser.rows[0].id, store_name, location],
        );
        break;

      default:
        await connection.query('ROLLBACK');
        return res.json(failureMsg(400, 'userType not found'));
    }
    await connection.query('COMMIT');
    return res.json(
      dataObj(201, newUser, `${user_type} user created successfully`),
    );
  } catch (err) {
    await connection.query('ROLLBACK');
    console.log(err);
    return res.json(failureMsg(500, 'Internal server error!'));
  }
};

export const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await connection.query(`SELECT * FROM users WHERE email = $1;`, [
    email,
  ]);
  if (
    !user.rows.length ||
    !(await argon2.verify(user.rows[0].password, password))
  )
    return res.json(failureMsg(400, 'invalid email or password'));

  const payload = { user_id: user.rows[0].id, role: user.rows[0].role };
  const options = { expiresIn: process.env.JWT_ACC_EXPIRATION };

  const access_token = await new Promise((resolve, reject) => {
    jwt.sign(payload, process.env.JWT_ACC_SECRET, options, (err, token) => {
      if (err) {
        reject(err);
      }
      resolve(token);
    });
  });

  const refresh_token = await new Promise((resolve, reject) => {
    jwt.sign(
      { user_id: user.rows[0].id },
      process.env.JWT_REF_SECRET,
      { expiresIn: process.env.JWT_REF_EXPIRATION },
      (err, token) => {
        if (err) {
          reject(err);
        }
        resolve(token);
      },
    );
  });
  res.json(
    dataObj(
      200,
      [{ access_token, refresh_token }],
      'user logged in successfully',
    ),
  );
};
