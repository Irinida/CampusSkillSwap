const router = require('express').Router();
const c = require('../controllers/requestController');
router.get('/', c.getRequests); router.get('/:id', c.getRequest); router.post('/', c.createRequest); router.put('/:id', c.updateRequest); router.delete('/:id', c.deleteRequest);
module.exports = router;
