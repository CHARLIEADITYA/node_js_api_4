require('dotenv').config()
const express = require('express');
const mssql = require('mssql');
const cors = require('cors')

const app = express();
const port = 4000;

// MSSQL configuration
const dbconfig = {
  user: process.env.USER,
  password: process.env.PASSWORD,
  server: process.env.SERVER,
  database: process.env.DATABASE,
  synchronize: true,
  trustServerCertificate: true,
  options: {
    encrypt: false // If you're on Windows Azure
  }
};

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors())

// GET all data
app.get('/nexhealth', async (req, res) => {
  try {
    const pool = await mssql.connect(dbconfig);
    const result = await pool.request().query('SELECT * FROM REGISTRATION_FORM');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Something went wrong');
  }
});

// GET data by ID
app.get('/nexhealth/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const pool = await mssql.connect(dbconfig);
    const result = await pool
      .request()
      .input('id', mssql.Int, id)
      .query('SELECT * FROM REGISTRATION_FORM WHERE id = @id');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Something went wrong');
  }
});

app.post('/nexhealth', async (req, res) => {
  const {
    PATIENT_NAME, CHOOSE_DOC, SPECIALIZATION, AGE, MOB, GENDER, A_DATE, B_GROUP, ADDRESS, CITY, STATE, PINCODE, FEES, DISCOUNT, AMOUNT, DISC_BY, P_DESCRIBE, S_INSTRUCTION } = req.body;
  try {
    const pool = await mssql.connect(dbconfig);
    const result = await pool
      .request()
      .input('PATIENT_NAME', mssql.VarChar, PATIENT_NAME)
      .input('CHOOSE_DOC', mssql.VarChar, CHOOSE_DOC)
      .input('SPECIALIZATION', mssql.VarChar, SPECIALIZATION)
      .input('AGE', mssql.VarChar, AGE)
      .input('MOB', mssql.VarChar, MOB)
      .input('GENDER', mssql.VarChar, GENDER)
      .input('A_DATE', mssql.VarChar, A_DATE)
      .input('B_GROUP', mssql.VarChar, B_GROUP)
      .input('ADDRESS', mssql.VarChar, ADDRESS)
      .input('CITY', mssql.VarChar, CITY)
      .input('STATE', mssql.VarChar, STATE)
      .input('PINCODE', mssql.VarChar, PINCODE)
      .input('FEES', mssql.VarChar, FEES)
      .input('DISCOUNT', mssql.VarChar, DISCOUNT)
      .input('AMOUNT', mssql.VarChar, AMOUNT)
      .input('DISC_BY', mssql.VarChar, DISC_BY)
      .input('P_DESCRIBE', mssql.VarChar, P_DESCRIBE)
      .input('S_INSTRUCTION', mssql.VarChar, S_INSTRUCTION)
      .query('INSERT INTO REGISTRATION_FORM (PATIENT_NAME, CHOOSE_DOC, SPECIALIZATION, AGE, MOB, GENDER, A_DATE,B_GROUP,ADDRESS,CITY, STATE,PINCODE,FEES,DISCOUNT,AMOUNT,DISC_BY,P_DESCRIBE,S_INSTRUCTION) VALUES (@PATIENT_NAME,@CHOOSE_DOC,@SPECIALIZATION,@AGE,@MOB,@GENDER,@A_DATE,@B_GROUP,@ADDRESS,@CITY, @STATE,@PINCODE,@FEES,@DISCOUNT,@AMOUNT,@DISC_BY,@P_DESCRIBE,@S_INSTRUCTION)');
      res.json({
        data:result
      });// Send JSON response
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Something went wrong' }); // Send JSON error response
  }
});

// PUT data (update)
app.put('/nexhealth/:id', async (req, res) => {
  const ID = req.params.id;
  const { PATIENT_NAME, CHOOSE_DOC, SPECIALIZATION, AGE, MOB, GENDER, A_DATE, B_GROUP, ADDRESS, CITY, STATE, PINCODE, FEES, DISCOUNT, AMOUNT, DISC_BY, P_DESCRIBE, S_INSTRUCTION } = req.body;
  try {
    const pool = await mssql.connect(dbconfig);
    const result = await pool
      .request()
      .input('ID', mssql.Int, ID)
      .input('PATIENT_NAME', mssql.VarChar, PATIENT_NAME)
      .input('CHOOSE_DOC', mssql.VarChar, CHOOSE_DOC)
      .input('SPECIALIZATION', mssql.VarChar, SPECIALIZATION)
      .input('AGE', mssql.VarChar, AGE)
      .input('MOB', mssql.VarChar, MOB)
      .input('GENDER', mssql.VarChar, GENDER)
      .input('A_DATE', mssql.VarChar, A_DATE)
      .input('B_GROUP', mssql.VarChar, B_GROUP)
      .input('ADDRESS', mssql.VarChar, ADDRESS)
      .input('CITY', mssql.VarChar, CITY)
      .input('STATE', mssql.VarChar, STATE)
      .input('PINCODE', mssql.VarChar, PINCODE)
      .input('FEES', mssql.VarChar, FEES)
      .input('DISCOUNT', mssql.VarChar, DISCOUNT)
      .input('AMOUNT', mssql.VarChar, AMOUNT)
      .input('DISC_BY', mssql.VarChar, DISC_BY)
      .input('P_DESCRIBE', mssql.VarChar, P_DESCRIBE)
      .input('S_INSTRUCTION', mssql.VarChar, S_INSTRUCTION)
      .query('UPDATE REGISTRATION_FORM SET PATIENT_NAME = @PATIENT_NAME, CHOOSE_DOC = @CHOOSE_DOC, SPECIALIZATION = @SPECIALIZATION, AGE = @AGE,MOB = @MOB, GENDER = @GENDER, A_DATE = @A_DATE,B_GROUP = @B_GROUP,ADDRESS = @ADDRESS, CITY = @CITY, STATE = @STATE, PINCODE = @PINCODE, FEES = @FEES, DISCOUNT = @DISCOUNT, AMOUNT = @AMOUNT, DISC_BY = @DISC_BY,P_DESCRIBE = @P_DESCRIBE,S_INSTRUCTION = @S_INSTRUCTION WHERE ID = @id');
    console.log("qry", result)
    res.json({ message: 'Data update successfully' }); // Send JSON response
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Something went wrong');
  }
});

// DELETE data
app.delete('/nexhealth/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const pool = await mssql.connect(dbconfig);
    const result = await pool
      .request()
      .input('id', mssql.Int, id)
      .query('DELETE FROM REGISTRATION_FORM WHERE id = @id');
    res.json({ message: 'Data delete successfully' }); // Send JSON response
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Something went wrong');
  }
});

// Doctor
app.get('/login', async (req, res) => {
  try {
    const pool = await mssql.connect(dbconfig);
    const result = await pool.request().query('SELECT * FROM doctor_id');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Something went wrong');
  }
});

app.get('/login/:id', async (req, res) => {
  const D_ID = req.params.id;
  try {
    const pool = await mssql.connect(dbconfig);
    const result = await pool
      .request()
      .input('D_ID', mssql.Int, D_ID)
      .query('SELECT * FROM doctor_id WHERE D_ID = @D_ID');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Something went wrong');
  }
});

app.post('/login', async (req, res) => {
  const { DOCTOR_ID, DOC_PASS } = req.body;

  try {
    // Connect to the database
    const pool = await mssql.connect(dbconfig);
    // Query the database to find the user
    const result = await pool.request()
      .input('DOCTOR_ID', mssql.VarChar, DOCTOR_ID)
      .input('DOC_PASS', mssql.VarChar, DOC_PASS)
      .query('SELECT * FROM doctor_id WHERE DOCTOR_ID = @DOCTOR_ID AND DOC_PASS = @DOC_PASS');
    
    // If user exists, return success message
    if (result.recordset.length > 0) {
      res.json({
        data: result.recordset
      });
    }
  } catch (err) {
    console.error('SQL Error:', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//  Tablets

app.get('/tablets', async (req, res) => {
  try {
    const pool = await mssql.connect(dbconfig);
    const result = await pool.request().query(`select DRUG_NAME FROM DRUG_DATA WHERE DRUG_TYPE = 'TAB' `);
    res.json(result.recordset);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Something went wrong');
  }
});
app.get('/Syrup', async (req, res) => {
  try {
    const pool = await mssql.connect(dbconfig);
    const result = await pool.request().query(`select DRUG_NAME FROM DRUG_DATA WHERE DRUG_TYPE = 'SYRUP' `);
    res.json(result.recordset);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Something went wrong');
  }
});
app.get('/Injection', async (req, res) => {
  try {
    const pool = await mssql.connect(dbconfig);
    const result = await pool.request().query(`select DRUG_NAME FROM DRUG_DATA WHERE DRUG_TYPE = 'Injection' `);
    res.json(result.recordset);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Something went wrong');
  }
});
app.get('/CAP', async (req, res) => {
  try {
    const pool = await mssql.connect(dbconfig);
    const result = await pool.request().query(`select DRUG_NAME FROM DRUG_DATA WHERE DRUG_TYPE = 'CAP' `);
    res.json(result.recordset);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Something went wrong');
  }
});

// Medicine add api

app.post('/medical/:id', async (req, res) => {
  const ID = req.params.id;
  const { M_TYPE, M_Name, DOSE, DURATION
  } = req.body;
  try {
    const pool = await mssql.connect(dbconfig);
    const result = await pool
      .request()
      .input('ID', mssql.Int, ID)
      .input('M_TYPE', mssql.VarChar, M_TYPE)
      .input('M_Name', mssql.VarChar,M_Name)
      .input('DOSE', mssql.VarChar, DOSE)
      .input('DURATION', mssql.VarChar, DURATION)
      .query(`INSERT INTO MEDICINE_TABLE (M_TYPE, M_Name, DOSE, DURATION,ID)
      VALUES (@M_TYPE,@M_Name,@DOSE,@DURATION,@ID)`)
    res.json({ message: 'Data added successfully' }); // Send JSON response
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Something went wrong' }); // Send JSON error response
  }
});

app.get('/medical/:id', async (req, res) => {
  const ID = req.params.id;
  try {
    const pool = await mssql.connect(dbconfig);
    const result = await pool
      .request()
      .input('ID', mssql.Int, ID)
      .query('SELECT * FROM MEDICINE_TABLE WHERE ID= @ID')
    res.json(result.recordset);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Something went wrong');
  }
});

app.delete('/medical/:id', async (req, res) => {
  const M_Id = req.params.id;
  try {
    const pool = await mssql.connect(dbconfig);
    const result = await pool
      .request()
      .input('M_Id', mssql.Int, M_Id)
      .query('DELETE FROM MEDICINE_TABLE WHERE M_Id = @M_Id');
    res.json({ message: 'Data delete successfully' }); // Send JSON response
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Something went wrong');
  }
});

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${port}`);
});