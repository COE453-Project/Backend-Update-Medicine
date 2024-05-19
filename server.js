const express = require('express');
const logResponse = require('./log.js');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.put('/:id', (req, res, next) => {
    // Get the details of the medicine
    const id = req.params.id;
    const name = req.body.name;
    const description = req.body.description;
    const productionDate = req.body.productionDate;
    const expiryDate = req.body.expiryDate;

    // TODO save the new details to the database

    // Construct the response
    // TODO get the storedAtTimestamp from the database
    const riyadhTime = new Date().toLocaleString('en-US', {timeZone: 'Asia/Riyadh'});
    const storedAtTimestamp = new Date(riyadhTime).toISOString();
    const lastUpdatedTimestamp = new Date(riyadhTime).toISOString();
    const response = {
        id: id,
        name: name,
        description: description,
        productionDate: productionDate,
        expiryDate: expiryDate,
        storedAtTimestamp: storedAtTimestamp,
        lastUpdatedTimestamp: lastUpdatedTimestamp
    };

    // Send the response
    res.json(response);
    next();
});

app.use(logResponse);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});