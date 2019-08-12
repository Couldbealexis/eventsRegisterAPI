const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');


const app = express();
app.use(cors());
const routes = require('./routes/v1');

// app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/v1', routes);

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
