const express = require('express');
const controller = require('../../controllers/user.controller');

const router = express.Router();

// create
router.post('/', controller.create);
// list all
router.get('/', controller.findAll);
// find one
router.get('/:id', controller.findOne);
// update one
router.put('/:id', controller.updateOne);
// delete One
router.delete('/:id', controller.delete);
// reactivate One
router.put('/reactivate/:id', controller.reactivate);
// change password
router.put('/recover/:id', controller.changePassword);

module.exports = router;
