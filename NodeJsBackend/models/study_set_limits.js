const db = require('../db'); // SQLite3 database connection
const {
    buildErrObject,
} = require('../middleware/utils');


const StudySetLimit = {

    countUserSetsAttemptedToday: (user_id,today) => {
        const query = 'SELECT COUNT(*) AS count FROM study_sets_limits WHERE user_id = ? AND DATE(current_attempt_date) = ?';    
        return new Promise((resolve, reject) => {
            db.get(query, [user_id,today], (err, row) => {  
                if (err) {
                    reject(new Error(`Error fetching study_sets_limits: ${err.message}`)); 
                } else {
                    resolve(row); 
                }
            });
        });
    },

    findOne: (email) => {
        const query = 'SELECT * FROM study_sets_limits WHERE limit_id = ?';
    
        return new Promise((resolve, reject) => {
            db.get(query, [email], (err, row) => {  
                if (err) {
                    reject(new Error(`Error fetching study_sets_limits: ${err.message}`)); 
                } else {
                    resolve(row); 
                }
            });
        });
    },



    findAll: () => {
        const query = 'SELECT * FROM study_sets_limits ORDER BY limit_id DESC';
        return new Promise((resolve, reject) => {
            db.all(query, [], (err, rows) => {
                if (err) {
                    reject(new Error(`Error fetching study_sets_limits: ${err.message}`));
                } else {
                    resolve(rows);
                }
            });
        });
    },


    // Function to add
    addRecord: (userData) => {
        const query = 'INSERT INTO study_sets_limits (user_id,set_id) VALUES (?,?)';
        return new Promise((resolve, reject) => {
            db.run(query, [userData.user_id,userData.set_id], function (err) {
                if (err) {
                    return reject(new Error(`Error inserting study_sets_limits: ${err.message}`));
                }
                resolve({
                    message: 'Study Set Limit Added Successfully!',
                    data: {
                        limit_id: this.lastID,  
                        user_id: userData.user_id,
                        set_id: userData.set_id
                    }
                });
            });
        });
    },
};

module.exports = StudySetLimit;
