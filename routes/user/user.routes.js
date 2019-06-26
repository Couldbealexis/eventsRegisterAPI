const express = require('express');
const controller = require('../../controllers/user.controller');

const router = express.Router();

// create
router.post('/', controller.create);
// list all
router.get('/', controller.findAll);
// find one
router.get('/:id', controller.findOne);

module.exports = router;
