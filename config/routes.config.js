const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

router.post('/recipes', recipe.create);
router.get('/recipes', recipe.list);
router.get('/recipes/:id', recipe.detail);
router.patch('recipes/:id', recipe.update);
router.delete('recipes/:id', recipe.delete);

module.exports = router;