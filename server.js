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

  let status = 0;
  let content = '';
  const url = `${db}/${id}`
  await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(medicineData)
  })
  .then(async response => {
    status = response.status
    content = await response.json()
  })
  .catch(error => {
    status = 500
    content = 'Internal server error occurred'
    console.error('An error occurred:', error)
  });
  res.status(status).send(content);
  next();
});


app.use(logResponse);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
