const express = require('express');
const { getAllChuas, getChuaById, createChua, updateChua, deleteChua } = require('../controllers/chuaController');
const router = express.Router();

router.get('/', getAllChuas);
router.get('/:id', getChuaById);
router.post('/', createChua);
router.put('/:id', updateChua);
router.delete('/:id', deleteChua);

module.exports = router;