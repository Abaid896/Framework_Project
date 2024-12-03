var bcrypt = require('bcryptjs');
const User = require('../models/user');
const QuizTiming = require('../models/quiz_timing');
const FlashcardQuiz = require('../models/flashcard_quiz');
const db = require('../db');


const {
    buildErrObject,
} = require('../middleware/utils');
const Category = require('../models/categories');
// const { default: StartQuiz } = require('../../src/components/quiz');



module.exports = {

    //*****************************************   Users Registration  **************************************************** */

    //Register User
    async registerUser(req) {
        return new Promise(async (resolve, reject) => {
            try {
                // To create a hashed password
                const bcrypt_password = await bcrypt.hash(req.password, 10);
        
                // Create a new user credentials object
                const credentials = {
                    name: req.name,
                    email: req.email,
                    password: bcrypt_password
                };
        
                const addedUser = await User.addUser(credentials);
                resolve(addedUser);
            } catch (err) {
                console.error("Error during registration:", err);
                reject(buildErrObject(422, err.message)); 
            }
        });
    },
  
    
    // get getAllUser
    async getAllUser(){
        return new Promise((resolve,reject)=>{
            User.findAll().then(data=>{
                resolve({
                    data:data
                })
            }).catch(err=>{
                reject(buildErrObject(422,err.message))
            })                     
        })
    },
    
    
    // get getCategory
    async getCategory(){
        return new Promise((resolve,reject)=>{
            Category.findAll().then(data=>{
                resolve({
                    data:data
                })
            }).catch(err=>{
                reject(buildErrObject(422,err.message))
            })                     
        })
    },
    
    // get getCategory
    async getQuizAnswer(){
        return new Promise((resolve,reject)=>{
            FlashcardQuiz.findAll().then(data=>{
                resolve({
                    data:data
                })
            }).catch(err=>{
                reject(buildErrObject(422,err.message))
            })                     
        })
    },

    async getUserStatistics(user_id, set_id) {
        return new Promise((resolve, reject) => {
            // SQL query to calculate the required statistics
            const query = `
                SELECT 
                    IFNULL(COUNT(CASE WHEN is_done = 1 THEN 1 END), 0) AS total_done,  
                    IFNULL(SUM(CASE WHEN is_correct = 1 THEN 1 ELSE 0 END), 0) AS total_marks,  
                    IFNULL((SELECT COUNT(*) FROM flashcards WHERE set_id = ?), 0) AS total_questions  
                FROM quiz_answers
                WHERE user_id = ? AND set_id = ?
            `;
            
            // Execute the query using the db object (SQLite in this case)
            db.get(query, [set_id, user_id, set_id], (err, result) => {
                if (err) {
                    // If an error occurs, reject the promise with a custom error message
                    reject(buildErrObject(500, err.message));
                } else {
        
                    // If the query is successful, resolve with the result
                    resolve({
                        total_done: result.total_done || 0,           // Total number of completed answers
                        total_marks: result.total_marks || 0,         // Total number of correct answers
                        total_questions: result.total_questions || 0,  // Total number of flashcards in the set
                        correct_answer: result.total_marks || 0  // Total number of flashcards in the set
                    });
                }
            });
        });
    },        
    
    // get getAllTimings
    async getAllTimings(){
        return new Promise((resolve,reject)=>{
            QuizTiming.findAll().then(data=>{
                resolve({
                    data:data
                })
            }).catch(err=>{
                reject(buildErrObject(422,err.message))
            })                     
        })
    },



}