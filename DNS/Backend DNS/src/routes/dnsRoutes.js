const express = require('express');
const router = express.Router();
const dnsController = require('../controllers/dnsController');

router.get('/records', dnsController.getAllRecords);
router.post('/records', dnsController.createRecord);
router.get('/records/:domain', dnsController.getRecord);
router.put('/records/:domain', dnsController.updateRecord);
router.delete('/records/:domain', dnsController.deleteRecord);

module.exports = router;