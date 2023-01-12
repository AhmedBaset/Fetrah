const express = require('express')
const router = express.Router()
const { signup, signin, signout, requireSignIn } = require('../controllers/auth')

//validators 
const { runValidation } = require('../validators')
const { userSignupValidator, userSigninValidator } = require('../validators/auth')

router.post('/signup', userSignupValidator, runValidation, signup)
router.post('/signin', userSigninValidator, runValidation, signin)
router.get('/signout', signout)

router.get('/secret', requireSignIn, (req, res) => {
    res.json({
        message: 'You have access to secret page'
    })
});

module.exports = router 