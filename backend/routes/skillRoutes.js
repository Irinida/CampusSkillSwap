const router = require('express').Router();
const c = require('../controllers/skillController');
router.get('/', c.getSkills); router.get('/:id', c.getSkill); router.post('/', c.createSkill); router.put('/:id', c.updateSkill); router.delete('/:id', c.deleteSkill);
module.exports = router;
