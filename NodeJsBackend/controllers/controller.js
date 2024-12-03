const User = require('../models/user');
const FlashCardSet = require('../models/flashcard_set');
const FlashCard = require('../models/flashcards');
const FlashcardAnswerOption = require('../models/flashcard_answer_option.js');
const Category = require('../models/categories');
const QuizTiming = require('../models/quiz_timing');
const QuizAnswer = require('../models/flashcard_quiz');
const StudySetLimit = require('../models/study_set_limits');

const utils = require('../middleware/utils');
const db = require('../middleware/db');
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');


  //Find user
  const findUser = async (email) => {
    return new Promise((resolve, reject) => {  
        try {
            const item = User.findOne(email);
            if (!item) {
                return utils.itemNotFound(null, item, reject, 'No account registered with us.');
            }
            return resolve(item);  
        } catch (err) {
            utils.itemNotFound(err, null, reject, 'ERROR');
        }
    });
  };  



  //generate token
  const generateToken = User => {
      return(jwt.sign({User},process.env.JWT_SECRET))
  }
  
  //register user
  exports.registerUser = async (req,res) => {

    try {
      var tr = req.body;

      const user_data = await db.registerUser(tr)

      res.status(200).json({
          code : 200,
          data : user_data
      });
      } catch (error) {
          console.log(error);
          utils.handleError(res, error)
      }
  }
     
  // get getAllTimings
  exports.getAllTimings= async(req,res)=>{

    try{
        var respon = await db.getAllTimings()
      
        res.status(200).json(respon);       
    } catch (error) {
        utils.handleError(res, error)
    }
  }
     
  // get getUser
  exports.getAllUser= async(req,res)=>{

    try{
        var respon = await db.getAllUser()
      
        res.status(200).json(respon);       
    } catch (error) {
        utils.handleError(res, error)
    }
  }
     
  // get getCategory
  exports.getCategory= async(req,res)=>{

    try{
        var respon = await db.getCategory()
      
        res.status(200).json(respon);       
    } catch (error) {
        utils.handleError(res, error)
    }
  }
     
  // get getCategory
  exports.getQuizAnswer= async(req,res)=>{

    try{
        var respon = await db.getQuizAnswer()
      
        res.status(200).json(respon);       
    } catch (error) {
        utils.handleError(res, error)
    }
  }

  //Login
  exports.login = async (req, res) => {
    try {

      const data = req.body;
      //Find User
       const user = await findUser(data.email);

       if (!user) {
           return res.status(409).json({
               code: 409,
               message: "No account registered with us!"
           });
       }

      //Check Password
      const isPasswordMatch = await auth.checkPassword(data.password, user)

      //Generate Token
      const token = await generateToken(user.user_id);

      //If Incorrect Password
      if (!isPasswordMatch) {

        res.status(409).json({
          code: 409,
          message: "Password is not correct"
        });
      }
      else {
          res.status(200).json({
          code: 200,
          token: token,
          data: user
        });
      }
    } catch (error) {
      utils.handleError(res, error)
    }
  }

 
  //Add Flashcards
  exports.addFlashcardSet = async (req, res) => {
    try {
      // const { title, description, category } = data;  
      const { title, description, category } = req.body;  
      // const user_id = req.user.user_id;
      const user_id =1;
  
      let category_id;
  
      // Step 1: Check if the category exists
      const cat_data = {
          name: category
      };
      
      const categoryExists = await Category.findOne(cat_data.name);
  
      if (categoryExists) {
        category_id = categoryExists.category_id;
      } else {
        const newCategory = await Category.addRecord(cat_data);
        category_id = newCategory.data.category_id; 
      }
  
      // Step 2: Add the Flashcard Set with the valid category_id
      const flashcardSet = await FlashCardSet.addRecord({
        title,
        description,
        user_id,
        category_id
      });
  
      // Validate that the set_id exists
      if (!flashcardSet || !flashcardSet.data || !flashcardSet.data.set_id) {
        console.error('Failed to create flashcard set or missing set_id:', flashcardSet);
        return res.status(400).json({ code: 400, message: 'Failed to create flashcard set or missing set_id.' });
      }
  
      let createdFlashcards = [];
  
      const flashcards = req.body.flashcards;
  
      if (flashcards && flashcards.length > 0) {
        // Step 3: Add Flashcards associated with the Flashcard Set
        const flashcardPromises = flashcards.map(async (flashcard) => {
          const flashcardData = {
            question: flashcard.question,
            answer: flashcard.answer,
            set_id: flashcardSet.data.set_id // This should be valid now
          };
  
          // Add Flashcard to the database
          const createdFlashcard = await FlashCard.addRecord(flashcardData);
          createdFlashcards.push(createdFlashcard);  // Store the created flashcard
          
          // Step 4: Add Answer Options for Each Flashcard
          if (flashcard.options && flashcard.options.length > 0) {
            const optionPromises = flashcard.options.map(async (option) => {
              const optionData = {
                card_id: createdFlashcard.data.card_id,  // Use the created flashcard ID
                option: option
              };
  
              // Add option to the flashcard_answer_options table
              const createdFlashcardOption = await FlashcardAnswerOption.addRecord(optionData);
              // Append the created options directly to the createdFlashcard object
              if (!createdFlashcard.options) {
                createdFlashcard.options = []; // Initialize options if not already present
              }
              createdFlashcard.options.push(createdFlashcardOption); // Append the created option to the flashcard
            });
  
            // Wait for all option inserts to complete
            await Promise.all(optionPromises);
          }
        });
  
        // Step 5: Wait for all flashcards to be added before responding
        await Promise.all(flashcardPromises);
      }
  
      // Respond with success, including flashcards and their associated options
      res.status(200).json({
        code: 200,
        message: 'Flashcard set and flashcards added successfully!',
        flashcardSet: flashcardSet.data,
        flashcards: createdFlashcards,  // Include flashcards with options
      });
  
    } catch (error) {
      // Handle any error that occurs during the process
      console.error('Error inserting flashcards:', error); // Debug: Log the error
      utils.handleError(res, error);
    }
  };
  

  // Get Flashcard Set and Related Records
  exports.getFlashcardSet = async (req, res) => {
    try {
      // Step 1: Fetch all flashcard sets with their related categories
      const flashcardSets = await FlashCardSet.findAll({
        include: [
          {
            model: Category, // Include category info for each flashcard set
            as: 'category',
            attributes: ['category_id', 'name']
          }
        ]
      });

      if (!flashcardSets || flashcardSets.length === 0) {
        return res.status(404).json({ code: 404, message: 'No flashcard sets found.' });
      }

      // Step 2: Fetch all flashcards
      const flashcards = await FlashCard.findAll();
    
      if (!flashcards || flashcards.length === 0) {
        return res.status(404).json({ code: 404, message: 'No flashcards found.' });
      }

      // Step 3: Structure the response to return flashcard sets, flashcards, and options
      const response = await Promise.all(flashcardSets.map(async (flashcardSet) => {
        // Filter flashcards for the current set
        const relatedFlashcards = flashcards.filter(flashcard => flashcard.set_id === flashcardSet.set_id);

        // Fetch options for each flashcard
        const flashcardData = await Promise.all(relatedFlashcards.map(async (flashcard) => {
          // Fetch answer options for each flashcard using the findAnswerOptions method
          const options = await FlashCard.findAnswerOptions(flashcard.card_id);

          // Get unique options by converting to a Set and back to an array
          const uniqueOptions = [...new Set(options.map(option => option.option))];

          // Map each unique option into a separate array
          const optionsInArrays = uniqueOptions.map(option => [option]);  // Wrap each option in a separate array

          return {
            question: flashcard.question,
            answer: flashcard.answer,
            options: optionsInArrays  // Return options as individual arrays
          };
        }));

        return {
          set_id: flashcardSet.set_id,
          title: flashcardSet.title,
          description: flashcardSet.description,
          category: flashcardSet.category_name ? flashcardSet.category_name : null, // Category name
          flashcards: flashcardData
        };
      }));

      res.status(200).json({
        code: 200,
        message: 'All flashcard sets and related records fetched successfully!',
        data: response,
      });

    } catch (error) {
      console.error('Error fetching flashcard sets:', error); // Debug: Log the error
      utils.handleError(res, error);
    }
  };


  //Start Flashcard set
  exports.startFlashcardSet = async (req, res) => {
    try {
      // Step 1: Get the set_id from the request params
      const { set_id } = req.body; // Assuming `set_id` is passed in the body of the request

      if (!set_id) {
        return res.status(400).json({
          code: 400,
          message: "set_id is required in the request body.",
        });
      }

      // Step 2: Fetch the specific flashcard set using the custom `findOne` method from the model
      const flashcardSet = await FlashCardSet.findOne(set_id);  
      if (!flashcardSet) {
        return res.status(404).json({
          code: 404,
          message: `Flashcard set with set_id ${set_id} not found.`,
        });
      }
  
      // Step 3: Fetch all flashcards for the specified set_id
      const flashcards = await FlashCard.findAllBySetId(set_id);
      
      if (!flashcards || flashcards.length === 0) {
        return res.status(404).json({
          code: 404,
          message: `No flashcards found for set_id ${set_id}.`,
        });
      }

      const user_id = 1;

      //Check Attempt Limit
      const today = new Date().toISOString().slice(0, 10); 
      const setsAttemptedToday = await StudySetLimit.countUserSetsAttemptedToday(user_id, today);
  
      if (setsAttemptedToday > 20) {
        return res.status(403).json({
          code: 403,
          message: "Limit exceeded: You can only attempt 20 sets per day.",
        });
      }

      var new_set_id = flashcards[0]?.set_id;
      
      // Start Quiz
      // const user_id = req.user.user_id;
      const started_at = new Date().toISOString();

      const startQuiz = {
          user_id: user_id,
          started_at: started_at,
          set_id: new_set_id
      };

      const addstartQuiz = await QuizTiming.addRecord(startQuiz);

      if (!addstartQuiz) {
        console.error('Failed to start quiz timing');
        return res.status(400).json({ code: 400, message: 'Failed to start quiz timing' });
      }

      // Add Number of quizes Attempted Per Day
      const quizLimit = {
          user_id: user_id,
          set_id: new_set_id
      };

      const addQuizLimit = await StudySetLimit.addRecord(quizLimit);

      if (!addQuizLimit) {
        console.error('Failed to add quiz limit');
        return res.status(400).json({ code: 400, message: 'Failed to add quiz limit' });
      }
  
      // Step 4: Structure the response to return flashcard set, flashcards, and options
      const flashcardData = await Promise.all(
        flashcards.map(async (flashcard) => {
          // Fetch answer options for each flashcard using the findAnswerOptions method
          const options = await FlashCard.findAnswerOptions(flashcard.card_id);
  
          // Get unique options by converting to a Set and back to an array
          const uniqueOptions = [...new Set(options.map((option) => option.option))];
  
          // Wrap each option in a separate array
          const optionsInArrays = uniqueOptions.map((option) => [option]); // Each option as a separate array
  
          return {
            set_id: flashcard.set_id,
            card_id: flashcard.card_id,
            question: flashcard.question,
            answer: flashcard.answer,
            options: optionsInArrays, // Return options as individual arrays
          };
        })
      );
  
      // Step 5: Return the structured data in the response
      return res.status(200).json({
        code: 200,
        message: `Flashcard set with set_id ${set_id} fetched successfully!`,
        data: {
          set_id: flashcardSet.set_id,
          title: flashcardSet.title,
          description: flashcardSet.description,
          category: flashcardSet.category_name ? flashcardSet.category_name : null, // Category name
          flashcards: flashcardData,
        },
      });
    } catch (error) {
      console.error('Error fetching flashcard set:', error); 
      utils.handleError(res, error); 
    }
  };
  
  //Submit Answer
  exports.submitAnswer = async (req, res) => {
    try {
      const data = req.body;
      const set_id = data.set_id;
      const provided_answer = data.provided_answer;
      const card_id = data.card_id;
      // const user_id = req.user.user_id;
      const user_id = 1;
  
      const cat_data = {
        card_id: card_id
      };
      
      var is_correct = 0;

      const answerCorrectOrNot = await FlashCard.checkAnswer(cat_data.card_id);

      if (answerCorrectOrNot) {
        is_correct = 1;
      }

      //Add Answer
      const answerObj = {
          user_id: user_id,
          card_id: card_id,
          set_id: set_id,
          provided_answer: provided_answer,
          is_done: 1,
          is_correct: is_correct,
      };
      
      const addAnswerObj = await QuizAnswer.addRecord(answerObj);
  
      // Validate 
      if (!addAnswerObj) {
        console.error('Failed to submit answer');
        return res.status(400).json({ code: 400, message: 'Failed to submit answer' });
      }
     
      res.status(200).json({
        code: 200,
        message: 'Answer Submitted Successfully!',
        data: addAnswerObj
      });
  
    } catch (error) {
      // Handle any error that occurs during the process
      console.error('Error inserting flashcards:', error); // Debug: Log the error
      utils.handleError(res, error);
    }
  };
  
  
  
  //Skip Answer
  exports.skipAnswer = async (req, res) => {
    try {
      const data = req.body;
      const set_id = data.set_id;
      const card_id = data.card_id;
      // const user_id = req.user.user_id;
      const user_id = 1;
       
      var is_skip = 1;
      var is_correct = 0;

      //Add Answer
      const answerObj = {
          user_id: user_id,
          card_id: card_id,
          set_id: set_id,
          is_done: 1,
          is_correct: is_correct,
          is_skip: is_skip,
      };
      
      const addAnswerObj = await QuizAnswer.addRecord(answerObj);
      
      // Validate 
      if (!addAnswerObj) {
        console.error('Failed to skip answer');
        return res.status(400).json({ code: 400, message: 'Failed to skip answer' });
      }
     
      res.status(200).json({
        code: 200,
        message: 'Answer Skipped Successfully!',
        data: addAnswerObj
      });
  
    } catch (error) {
      // Handle any error that occurs during the process
      console.error('Error inserting flashcards:', error); // Debug: Log the error
      utils.handleError(res, error);
    }
  };
  
  
  
  //Skip Answer
  exports.displayGrade = async (req, res) => {
    try {
      const { set_id } = req.body;
    
      const user_id = 1;
  
      // Validate input
      if (!user_id || !set_id) {
        return res.status(400).json({ code: 400, message: 'Set ID is required.' });
      }
  
      // Get statistics by calling the method
      const stats = await db.getUserStatistics(user_id, set_id); // Call the function
  
      res.status(200).json({
        code: 200,
        message: 'Statistics retrieved successfully!',
        data: stats
      });
    } catch (error) {
      console.error('Error retrieving statistics:', error);
      return res.status(500).json({ code: 500, message: 'Internal Server Error' });
    }
  };
  
  
  //Check Answer
  exports.checkAnswer = async (req, res) => {
    try {
      const data = req.body;
      const set_id = data.set_id;
      const card_id = data.card_id;
      // const user_id = req.user.user_id;
      const user_id = 1;
       
      var is_skip = 0;
      var is_correct = 0;

      //Add Answer
      const answerObj = {
          user_id: user_id,
          card_id: card_id,
          set_id: set_id,
          is_done: 1,
          is_skip: is_skip,
          is_correct: is_correct,
      };
      
      const addAnswerObj = await QuizAnswer.addRecord(answerObj);
      
      // Validate 
      if (!addAnswerObj) {
        console.error('Failed to skip answer');
        return res.status(400).json({ code: 400, message: 'Failed to skip answer' });
      }
     
      res.status(200).json({
        code: 200,
        message: 'Answer Skipped Successfully!',
        data: addAnswerObj
      });
  
    } catch (error) {
      // Handle any error that occurs during the process
      console.error('Error inserting flashcards:', error); // Debug: Log the error
      utils.handleError(res, error);
    }
  };
  

  // Get Flashcard Set by Category Name
  exports.getFlashcardSetByCategory = async (req, res) => {
    try {
      // Step 1: Get category_name from query parameters
      const { category_name } = req.body;

      // Step 2: Fetch all flashcard sets with their related categories
      const flashcardSets = await FlashCardSet.findAll({
        include: [
          {
            model: Category, // Include category info for each flashcard set
            as: 'category',
            attributes: ['category_id', 'name']
          }
        ]
      });

      // Step 3: If category_name is provided, filter flashcard sets by category
      const filteredSets = category_name
        ? flashcardSets.filter(set => set.category_name.toLowerCase() === category_name.toLowerCase())
        : flashcardSets;

      // Step 4: If no flashcard sets found for the given category, return 404
      if (filteredSets.length === 0) {
        return res.status(404).json({ code: 404, message: 'No flashcard sets found for the given category.' });
      }

      // Step 5: Fetch all flashcards
      const flashcards = await FlashCard.findAll();
      
      if (!flashcards || flashcards.length === 0) {
        return res.status(404).json({ code: 404, message: 'No flashcards found.' });
      }

      // Step 6: Structure the response to return flashcard sets, flashcards, and options
      const response = await Promise.all(filteredSets.map(async (flashcardSet) => {
        // Filter flashcards for the current set
        const relatedFlashcards = flashcards.filter(flashcard => flashcard.set_id === flashcardSet.set_id);

        // Fetch options for each flashcard
        const flashcardData = await Promise.all(relatedFlashcards.map(async (flashcard) => {
          // Fetch answer options for each flashcard using the findAnswerOptions method
          const options = await FlashCard.findAnswerOptions(flashcard.card_id);

          // Get unique options by converting to a Set and back to an array
          const uniqueOptions = [...new Set(options.map(option => option.option))];

          // Map each unique option into a separate array
          const optionsInArrays = uniqueOptions.map(option => [option]);  // Wrap each option in a separate array

          return {
            question: flashcard.question,
            answer: flashcard.answer,
            options: optionsInArrays  // Return options as individual arrays
          };
        }));

        return {
          set_id: flashcardSet.set_id,
          title: flashcardSet.title,
          description: flashcardSet.description,
          category: flashcardSet.category_name ? flashcardSet.category_name : null, // Category name
          flashcards: flashcardData
        };
      }));

      res.status(200).json({
        code: 200,
        message: 'Flashcard sets and related records fetched successfully!',
        data: response,
      });

    } catch (error) {
      console.error('Error fetching flashcard sets:', error); // Debug: Log the error
      utils.handleError(res, error);
    }
  };
