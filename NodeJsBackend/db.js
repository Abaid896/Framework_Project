const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database');
  }
});

// Create the 'users' table if it doesn't exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      user_id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      registered_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);
});
// Create the 'flashcard_sets' table if it doesn't exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS flashcard_sets (
      set_id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NULL,
      user_id INTEGER NOT NULL,
      category_id INTEGER NOT NULL
    );
  `);
});

// Create the 'flashcards' table if it doesn't exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS flashcards (
      card_id INTEGER PRIMARY KEY AUTOINCREMENT,
      set_id INTEGER NOT NULL,
      question TEXT NOT NULL,
      answer TEXT NOT NULL
    );
  `);
});

// Create the 'flashcard_answer_options' table if it doesn't exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS flashcard_answer_options (
      option_id INTEGER PRIMARY KEY AUTOINCREMENT,
      card_id INTEGER NOT NULL,
      option TEXT NOT NULL
    );
  `);
});

// Create the 'quiz_answers' table if it doesn't exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS quiz_answers (
      quiz_answer_id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      set_id INTEGER NOT NULL,
      card_id INTEGER NOT NULL,
      provided_answer TEXT NULL,
      is_correct INTEGER NULL,
      is_skip INTEGER NULL,
      is_done INTEGER NULL,
      given_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);
});

// Create the 'categories' table if it doesn't exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS categories (
      category_id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
    );
  `);
});

// Create the 'quiz_timings' table if it doesn't exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS quiz_timings (
      quiz_timing_id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      set_id INTEGER NOT NULL,
      started_at DATETIME NULL, 
      ended_at DATETIME NULL,
      duration TEXT NULL
    );
  `);
});

// Create the 'feedbacks' table if it doesn't exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS feedbacks (
      feedback_id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      set_id INTEGER NOT NULL,
      rating INTEGER NOT NULL,
      review TEXT NOT NULL,
      given_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);
});

// Create the 'study_sets_limits' table if it doesn't exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS study_sets_limits (
      limit_id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      set_id INTEGER NOT NULL,
      current_attempt_date TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);
});

module.exports = db;
