import pkg from 'pg';
const { Client } = pkg;


const connection = new Client({
  host: 'localhost',
  user: 'postgres',
  port: 5432,
  password: 'root',
  database: 'shippingDB',
});

try {
  await connection.connect();
  console.log('Connected to database successfully !');
} catch (err) {
  console.error('Error connecting to the database', err);
}

export { connection };
