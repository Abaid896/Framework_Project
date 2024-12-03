const db = require('../db'); // SQLite3 database connection
const {
    buildErrObject,
} = require('../middleware/utils');


const User = {

    findOne: (email) => {
        const query = 'SELECT * FROM users WHERE email = ?';
    
        return new Promise((resolve, reject) => {
            db.get(query, [email], (err, row) => {  
                if (err) {
                    reject(new Error(`Error fetching user: ${err.message}`)); 
                } else {
                    resolve(row); 
                }
            });
        });
    },


    findById: (id) => {
        const query = 'SELECT * FROM users WHERE user_id = ?';
    
        return new Promise((resolve, reject) => {
            db.get(query, [id], (err, row) => {  
                if (err) {
                    reject(new Error(`Error fetching user: ${err.message}`)); 
                } else {
                    resolve(row); 
                }
            });
        });
    },



    findAll: () => {
        const query = 'SELECT * FROM users ORDER BY user_id DESC';
        return new Promise((resolve, reject) => {
            db.all(query, [], (err, rows) => {
                if (err) {
                    reject(new Error(`Error fetching users: ${err.message}`));
                } else {
                    resolve(rows);
                }
            });
        });
    },


    // Function to add a user
    addUser: (userData) => {
        const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
        return new Promise((resolve, reject) => {
            db.run(query, [userData.name, userData.email, userData.password], function (err) {
                if (err) {
                    // Reject the promise if there's an error
                    return reject(new Error(`Error inserting user: ${err.message}`));
                }
    
                // Resolve the promise with success message and user data
                resolve({
                    message: 'User Registered Successfully!',
                    data: {
                        user_id: this.lastID,  
                        name: userData.name,        
                        email: userData.email,          
                        password: userData.password  
                    }
                });
            });
        });
    },
};

module.exports = User;
