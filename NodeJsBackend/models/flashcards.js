const db = require('../db'); // SQLite3 database connection
const FlashcardAnswerOption = require('../models/flashcard_answer_option.js');


const {
    buildErrObject,
} = require('../middleware/utils');


const Flashcard = {

    
    checkAnswer: (card_id, answer) => {
        const query = 'SELECT * FROM flashcards WHERE card_id = ? AND answer = ?';
    
        return new Promise((resolve, reject) => {
            db.get(query, [card_id, answer], (err, row) => {
                if (err) {
                    reject(new Error(`Error fetching flashcard: ${err.message}`));
                } else {
                    resolve(row); 
                }
            });
        });
    },
    

    findOne: (card_id) => {
        const query = 'SELECT * FROM flashcards WHERE card_id = ?';
    
        return new Promise((resolve, reject) => {
            db.get(query, [card_id], (err, row) => {  
                if (err) {
                    reject(new Error(`Error fetching flashcards: ${err.message}`)); 
                } else {
                    resolve(row); 
                }
            });
        });
    },



    findAllBySetId: (set_id) => {
        const query = 'SELECT * FROM flashcards WHERE set_id = ?';
        return new Promise((resolve, reject) => {
            db.all(query, [set_id], (err, rows) => {
                if (err) {
                    reject(new Error(`Error fetching flashcards: ${err.message}`));
                } else {
                    resolve(rows);
                }
            });
        });
    },


    findAll: () => {
        const query = 'SELECT * FROM flashcards ORDER BY card_id DESC';
        return new Promise((resolve, reject) => {
            db.all(query, [], (err, rows) => {
                if (err) {
                    reject(new Error(`Error fetching flashcards: ${err.message}`));
                } else {
                    resolve(rows);
                }
            });
        });
    },


    // Function to add a user
    addRecord: (userData) => {
        const query = 'INSERT INTO flashcards (set_id,question,answer) VALUES (?,?,?)';
        return new Promise((resolve, reject) => {
            db.run(query, [userData.set_id,userData.question,userData.answer], function (err) {
                if (err) {
                    // Reject the promise if there's an error
                    return reject(new Error(`Error inserting flashcards: ${err.message}`));
                }
    
                // Resolve the promise with success message and user data
                resolve({
                    message: 'Flashcard Added Successfully!',
                    data: {
                        card_id: this.lastID,  
                        set_id: userData.set_id,
                        question: userData.question,
                        answer: userData.answer,
                    }
                });
            });
        });
    },
};

Flashcard.findAnswerOptions = (cardId) => {
    const query = 'SELECT * FROM flashcard_answer_options WHERE card_id = ?';
    return new Promise((resolve, reject) => {
        db.all(query, [cardId], (err, rows) => {
            if (err) {
                reject(new Error(`Error fetching answer options: ${err.message}`));
            } else {
                resolve(rows); // Return the answer options for this flashcard
            }
        });
    });
};
  
module.exports = Flashcard;
