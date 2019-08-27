const express = require('express');
const controller = require('../../controllers/eventAttendees.controller');

const router = express.Router();

// create
router.post('/', controller.create);
// list all
router.get('/:event', controller.findAll);
// update one
router.put('/:id', controller.updateOne);

module.exports = router;
