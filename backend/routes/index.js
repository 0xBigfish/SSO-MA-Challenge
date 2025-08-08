const express = require('express');
const router = express.Router();

router.use('/logs', require('./logs'));
router.use('/auth-code', require('./auth-code'));
//router.use('/auth-code-pkce', require('./auth-code-pkce'));
//router.use('/implicit', require('./implicit'));
//router.use('/ropc', require('./ropc'));
//router.use('/client-credentials', require('./client-credentials'));

module.exports = router;