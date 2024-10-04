const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const {auth} = require('../middlewares/authMiddleware')

router.post('/register', authController.registerNewUser)
router.post('/login', authController.loginUser)
router.put('/update-profile/:userId', auth, authController.updateProfile)
router.delete('/delete-profile/:userId', auth, authController.deleteProfile)

module.exports = router;