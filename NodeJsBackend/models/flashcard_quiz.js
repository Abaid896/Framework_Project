const db = require('../db'); // SQLite3 database connection
const {
    buildErrObject,
} = require('../middleware/utils');


const FlashcardQuiz = {

    findOne: (email) => {
        const query = 'SELECT * FROM quiz_answers WHERE card_id = ?';
    
        return new Promise((resolve, reject) => {
            db.get(query, [email], (err, row) => {  
                if (err) {
                    reject(new Error(`Error fetching quiz_answers: ${err.message}`)); 
                } else {
                    resolve(row); 
                }
            });
        });
    },



    findAll: () => {
        const query = 'SELECT * FROM quiz_answers ORDER BY card_id DESC';
        return new Promise((resolve, reject) => {
            db.all(query, [], (err, rows) => {
                if (err) {
                    reject(new Error(`Error fetching quiz_answers: ${err.message}`));
                } else {
                    resolve(rows);
                }
            });
        });
    },


    // Function to add 
    addRecord: (userData) => {
        const query = 'INSERT INTO quiz_answers (user_id, set_id, card_id, provided_answer,is_correct,is_skip,is_done) VALUES (?, ?, ?,?,?,?,?)';
        return new Promise((resolve, reject) => {
            db.run(query, [userData.user_id, userData.set_id, userData.card_id, userData.provided_answer, userData.is_correct, userData.is_skip, userData.is_done], function (err) {
                if (err) {
                    return reject(new Error(`Error inserting quiz_answers: ${err.message}`));
                }
                resolve({
                    message: 'Answer Submitted Successfully!',
                    data: {
                        quiz_answer_id: this.lastID,  
                        set_id: userData.set_id,
                        user_id: userData.user_id,
                        card_id: userData.card_id,
                        provided_answer: userData.provided_answer,
                        is_correct: userData.is_correct,
                        is_skip: userData.is_skip,
                        is_done: userData.is_done
                    }
                });
            });
        });
    },
};

module.exports = FlashcardQuiz;
