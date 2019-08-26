const express = require('express');
const controller = require('../../controllers/eventDetails.controller');

const router = express.Router();

// create
router.post('/', controller.create);
// update one
router.put('/:id', controller.updateOne);

module.exports = router;
