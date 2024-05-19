const express = require('express');
const logResponse = require('./log.js');
const cors = require('cors');

const app = express();
const port = 3000;
const db = 'https://backend-database-olz2xjbmza-uc.a.run.app'

app.use(express.json());
app.use(cors());

app.put('', async (req, res, next) => {
  // Get the id as a query parameter
  if (!req.query.id) {
    res.status(400).send('Missing id parameter');
    next();
    return;
  }
  const id = req.query.id
  const medicineData = {
    name: req.body.name,
    description: req.body.description,
    productionDate:  req.body.productionDate,
    expiryDate: req.body.expiryDate
  };

  const url = `${db}/${id}`
  let options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(medicineData) // Stringify and include the medicineData in the body of your request
  };
  try {
    const response = await fetch(url,options)
    res.status(response.status)
    res.json(await response.json())
  } catch {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
  next();
});

app.put('/:id', async (req, res, next) => {
  // Get the details of the medicine
  const id = req.params.id
  const medicineData = {
    name: req.body.name,
    description: req.body.description,
    productionDate:  req.body.productionDate,
    expiryDate: req.body.expiryDate
  };

  const url = `${db}/${id}`
  let options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(medicineData) // Stringify and include the medicineData in the body of your request
  };
  try {
    const response = await fetch(url,options)
    res.status(response.status)
    res.json(await response.json())
  } catch {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
  next();
});


app.use(logResponse);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
