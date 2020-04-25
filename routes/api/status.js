const router = require('express').Router();

router.get('/status', (req, res) => {
    res.status(200).send('OK');
});

module.exports = router;