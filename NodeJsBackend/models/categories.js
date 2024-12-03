const db = require('../db'); // SQLite3 database connection
const {
    buildErrObject,
} = require('../middleware/utils');


const Category = {

    findOne: (name) => {
        const query = 'SELECT * FROM categories WHERE name = ?';
    
        return new Promise((resolve, reject) => {
            db.get(query, [name], (err, row) => {  
                if (err) {
                    reject(new Error(`Error fetching categories: ${err.message}`)); 
                } else {
                    resolve(row); 
                }
            });
        });
    },



    findAll: () => {
        const query = 'SELECT * FROM categories ORDER BY category_id DESC';
        return new Promise((resolve, reject) => {
            db.all(query, [], (err, rows) => {
                if (err) {
                    reject(new Error(`Error fetching categories: ${err.message}`));
                } else {
                    resolve(rows);
                }
            });
        });
    },


    // Function to add
    addRecord: (userData) => {

        console.log("userData.name --- "+userData.name);
        
        const query = 'INSERT INTO categories (name) VALUES (?)';
        return new Promise((resolve, reject) => {
            db.run(query, [userData.name], function (err) {
                if (err) {
                    // Reject the promise if there's an error
                    return reject(new Error(`Error inserting categories: ${err.message}`));
                }
    
                // Resolve the promise with success message 
                resolve({
                    message: 'Category Added Successfully!',
                    data: {
                        category_id: this.lastID,  
                        name: userData.name
                    }
                });
            });
        });
    },
};

module.exports = Category;
