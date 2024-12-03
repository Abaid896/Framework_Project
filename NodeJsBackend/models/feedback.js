const db = require('../db'); // SQLite3 database connection
const {
    buildErrObject,
} = require('../middleware/utils');


const Feedback = {

    findOne: (email) => {
        const query = 'SELECT * FROM feedbacks WHERE feedback_id = ?';
    
        return new Promise((resolve, reject) => {
            db.get(query, [email], (err, row) => {  
                if (err) {
                    reject(new Error(`Error fetching feedbacks: ${err.message}`)); 
                } else {
                    resolve(row); 
                }
            });
        });
    },



    findAll: () => {
        const query = 'SELECT * FROM feedbacks ORDER BY feedback_id DESC';
        return new Promise((resolve, reject) => {
            db.all(query, [], (err, rows) => {
                if (err) {
                    reject(new Error(`Error fetching feedbacks: ${err.message}`));
                } else {
                    resolve(rows);
                }
            });
        });
    },


    // Function to add
    addRecord: (userData) => {
        const query = 'INSERT INTO feedbacks (user_id,set_id, rating, review) VALUES (?,?,?,?)';
        return new Promise((resolve, reject) => {
            db.run(query, [userData.user_id,userData.set_id,userData.rating,userData.review], function (err) {
                if (err) {
                    return reject(new Error(`Error inserting feedbacks: ${err.message}`));
                }
                resolve({
                    message: 'Feedback Added Successfully!',
                    data: {
                        feedback_id: this.lastID,               
                        user_id: userData.user_id,
                        set_id: userData.set_id,
                        rating: userData.rating,
                        review: userData.review
                    }
                });
            });
        });
    },

};

module.exports = Feedback;
