const controller = require('../controllers/controller')
const express = require('express')
const router = express.Router()
const passport = require('passport')
const trimRequest = require('trim-request');
const cors = require('cors');
const requireAuth = passport.authenticate('jwt', { session: false })


router.use(cors());



/******************************************* login ************************************************** d */
router.post(
  '/login',
  trimRequest.all,
  controller.login
);



/******************************************* register user (user)************************************************** d */
router.post(
  '/register/user',
  trimRequest.all,
  controller.registerUser
);

/******************************************* get users (user)  ************************************************** d */
router.get(
  '/get/users',
  trimRequest.all,
  controller.getAllUser
);

/******************************************* get categories  ************************************************** d */
router.get(
  '/get/categories',
  // requireAuth,
  trimRequest.all,
  controller.getCategory
);

/******************************************* get categories  ************************************************** d */
router.get(
  '/get/quiz/answer',
  // requireAuth,
  trimRequest.all,
  controller.getQuizAnswer
);

/******************************************* get flashcard by category  ************************************************** d */
router.post(
  '/get/flashcard/by/category',
  // requireAuth,
  trimRequest.all,
  controller.getFlashcardSetByCategory
);

/******************************************* get users (user)************************************************** d */
router.get(
  '/get/timing',
  requireAuth,
  trimRequest.all,
  controller.getAllTimings
);


/*******************************************  Add Flashcards  ************************************************** */
router.post(
  '/add/flashcard',
  trimRequest.all,
  // requireAuth,
  controller.addFlashcardSet
);


/*******************************************  Get Flashcards  ************************************************** */
router.get(
  '/get/flashcard',
  trimRequest.all,
  requireAuth,
  controller.getFlashcardSet
);


/*******************************************  Start Flashcards  ************************************************** */
router.post(
  '/start/flashcard/quiz',
  trimRequest.all,
  // requireAuth,
  controller.startFlashcardSet
);



/*******************************************  Submit Answer  ************************************************** */
router.post(
  '/submit/answer',
  trimRequest.all,
  // requireAuth,
  controller.submitAnswer
);



/*******************************************  Check Answer  ************************************************** */
router.post(
  '/check/answer',
  trimRequest.all,
  // requireAuth,
  controller.checkAnswer
);



/*******************************************  Display Garde  ************************************************** */
router.post(
  '/display/grade',
  trimRequest.all,
  // requireAuth,
  controller.displayGrade
);


/*******************************************  Skip Answer  ************************************************** */
router.post(
  '/skip/answer',
  trimRequest.all,
  // requireAuth,
  controller.skipAnswer
);



module.exports = router
