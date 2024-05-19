const express = require('express');
const logResponse = require('./log.js');
const cors = require('cors');

const app = express();
const port = 3000;
const db = 'https://backend-database-olz2xjbmza-uc.a.run.app'

app.use(express.json());
app.use(cors());

app.put('/:id', (req, res, next) => {
  // Get the details of the medicine
  const id = req.params.id
  const medicineData = {
    name: req.body.name,
    description: req.body.description,
    productionDate:  req.body.productionDate,
    expiryDate: req.body.expiryDate
  };
  const url = `${db}/${id}`
  fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(medicineData)
  })
  .then(response => {
    console.log(data);
    res.status(200)
    res.json(response);
  })
  .catch(error => {
    res.status(500).send('Internal server error occurred');
    console.error('An error occurred:', error)
  });
  next();
});


app.use(logResponse);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
