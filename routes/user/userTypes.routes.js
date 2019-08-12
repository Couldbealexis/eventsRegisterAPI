const express = require('express');
const controller = require('../../controllers/userTypes.controller');

const router = express.Router();

// create
router.post('/', controller.create);
// list all
router.get('/', controller.findAll);
// find one
router.get('/:id', controller.findOne);
// update one
router.put('/:id', controller.updateOne);

module.exports = router;
