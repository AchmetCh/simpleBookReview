const express = require('express')
const router = express.Router()
const bookController = require('../controllers/bookController')
const {auth} = require('../middlewares/authMiddleware')

router.get('/all', bookController.getBooks)
router.get('/bookbyid/:id', bookController.getBookById)
router.post('/newbook', auth, bookController.createBook)
router.get('/userreviews/:userId', auth, bookController.UserReviews)
router.put('/editreview/:bookId', auth, bookController.editReview)
router.delete('/deletereview/:bookId', auth, bookController.deleteReview)
router.get('/search/:title', bookController.searchBook)


module.exports = router;