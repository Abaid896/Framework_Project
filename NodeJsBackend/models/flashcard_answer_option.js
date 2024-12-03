const db = require('../db'); // SQLite3 database connection
const {
    buildErrObject,
} = require('../middleware/utils');


const FlashcardAnswerOption = {

    findOne: (email) => {
        const query = 'SELECT * FROM flashcard_answer_options WHERE option_id = ?';
    
        return new Promise((resolve, reject) => {
            db.get(query, [email], (err, row) => {  
                if (err) {
                    reject(new Error(`Error fetching flashcard_answer_options: ${err.message}`)); 
                } else {
                    resolve(row); 
                }
            });
        });
    },



    findAll: () => {
        const query = 'SELECT * FROM flashcard_answer_options ORDER BY option_id DESC';
        return new Promise((resolve, reject) => {
            db.all(query, [], (err, rows) => {
                if (err) {
                    reject(new Error(`Error fetching flashcard_answer_options: ${err.message}`));
                } else {
                    resolve(rows);
                }
            });
        });
    },


    // Function to add
    addRecord: (userData) => {
        const query = 'INSERT INTO flashcard_answer_options (card_id,option) VALUES (?,?)';
        return new Promise((resolve, reject) => {
            db.run(query, [userData.card_id,userData.option], function (err) {
                if (err) {
                    // Reject the promise if there's an error
                    return reject(new Error(`Error inserting flashcard_answer_options: ${err.message}`));
                }
                resolve({
                    message: 'Option Added Successfully!',
                    data: {
                        option_id: this.lastID,  
                        card_id: userData.card_id,
                        option: userData.option,
                    }
                });
            });
        });
    },
};

module.exports = FlashcardAnswerOption;
