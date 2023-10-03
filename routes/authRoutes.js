const { Router } = require('express');
const authController = require('../controllers/authController')

const router = Router();

// Using router to route endpoints
router.get('/signup', authController.signup_get);
router.post('/signup', authController.signup_post);
router.get('/login', authController.login_get);
router.post('/login', authController.login_post);
router.get('/logout', authController.logout_get);

// Export routes
module.exports = router;