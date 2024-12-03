const db = require('../db'); // SQLite3 database connection
const {
    buildErrObject,
} = require('../middleware/utils');


const FlashcardSet = {

    findOne: (set_id) => {
        const query = `
        SELECT 
          flashcard_sets.*, 
          categories.name AS category_name
        FROM flashcard_sets
        LEFT JOIN categories ON flashcard_sets.category_id = categories.category_id
        WHERE flashcard_sets.set_id = ?
      `;    
    
        return new Promise((resolve, reject) => {
            db.get(query, [set_id], (err, row) => {  
                if (err) {
                    reject(new Error(`Error fetching flashcard set: ${err.message}`)); 
                } else {
                    resolve(row); 
                }
            });
        });
    },



    findAll: () => {

        const query = `
        SELECT 
          flashcard_sets.*, 
          categories.name AS category_name
        FROM flashcard_sets
        LEFT JOIN categories ON flashcard_sets.category_id = categories.category_id
        ORDER BY flashcard_sets.set_id DESC
      `;
      
        return new Promise((resolve, reject) => {
            db.all(query, [], (err, rows) => {
                if (err) {
                    reject(new Error(`Error fetching flashcard set: ${err.message}`));
                } else {
                    resolve(rows);
                }
            });
        });
    },


    // Function to add 
    addRecord: (userData) => {
        const query = 'INSERT INTO flashcard_sets (title, description, user_id, category_id) VALUES (?, ?, ?, ?)';
        return new Promise((resolve, reject) => {
            db.run(query, [userData.title, userData.description, userData.user_id, userData.category_id], function (err) {
                if (err) {
                    return reject(new Error(`Error inserting flashcard set: ${err.message}`));
                }
                resolve({
                    message: 'Flashcard Set Created Successfully!',
                    data: {
                        set_id: this.lastID,  
                        title: userData.title,
                        description: userData.description,
                        user_id: userData.user_id,  
                        category_id: userData.category_id 
                    }
                });
            });
        });
    },
};

module.exports = FlashcardSet;
