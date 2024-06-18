import { Client } from 'pg'

const connection = new Client({
    host: 'localhost',
    user: 'root',
    port: 5432,
    password: 'root',
    database: 'shippingDB'
})


(async () => {
    try {
      await connection.connect();
      console.log('Connected to database successfully !');
    } catch (err) {
      console.error('Error connecting to the database', err);
    }
})();


export { connection };
