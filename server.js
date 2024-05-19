const express = require('express');
const logResponse = require('./log.js');
const cors = require('cors');

const app = express();
const port = 3000;
const db = 'https://backend-database-olz2xjbmza-uc.a.run.app'

app.use(express.json());
app.use(cors());

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
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(medicineData)
  }
  try{
    const response = await fetch(url,options)
    const data = await response.json()
    res.status(200)
    res.body(data)
  } catch (error){
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
});


app.use(logResponse);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
