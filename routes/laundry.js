const router = require('express').Router();
const Laundry = require('../controllers/laundryController');

router.get('/', Laundry.showOrder);
router.get('/processOrder/:id', Laundry.edit);
router.post('/processOrder/:id', Laundry.edited);

module.exports = router;