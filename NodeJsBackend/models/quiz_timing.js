const db = require('../db'); // SQLite3 database connection
const {
    buildErrObject,
} = require('../middleware/utils');


const QuizTiming = {

    findOne: (email) => {
        const query = 'SELECT * FROM quiz_timings WHERE quiz_timing_id = ?';
    
        return new Promise((resolve, reject) => {
            db.get(query, [email], (err, row) => {  
                if (err) {
                    reject(new Error(`Error fetching quiz_timings: ${err.message}`)); 
                } else {
                    resolve(row); 
                }
            });
        });
    },



    findAll: () => {
        const query = 'SELECT * FROM quiz_timings ORDER BY quiz_timing_id DESC';
        return new Promise((resolve, reject) => {
            db.all(query, [], (err, rows) => {
                if (err) {
                    reject(new Error(`Error fetching quiz_timings: ${err.message}`));
                } else {
                    resolve(rows);
                }
            });
        });
    },


    // Function to add
    addRecord: (userData) => {
        const query = 'INSERT INTO quiz_timings (user_id,set_id,started_at,ended_at,duration) VALUES (?,?,?,?,?)';
        return new Promise((resolve, reject) => {
            db.run(query, [userData.user_id,userData.set_id,userData.started_at,userData.ended_at,userData.duration], function (err) {
                if (err) {
                    return reject(new Error(`Error inserting quiz_timings: ${err.message}`));
                }
                resolve({
                    message: 'Timing Added Successfully!',
                    data: {
                        quiz_timing_id: this.lastID,  
                        user_id: userData.user_id,
                        set_id: userData.set_id,
                        started_at: userData.started_at,
                        ended_at: userData.ended_at,
                        duration: userData.duration,
                    }
                });
            });
        });
    },
};

module.exports = QuizTiming;
