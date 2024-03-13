require('dotenv').config();

module.exports = {
  "development": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": "mysql",

    "pool": {
      "max":  20,
      "min": 0,
      "acquire": 60000,
      "idle": 10000
    },

    // The retry config if Deadlock Happened
    "retry": {
      "match": [/Deadlock/i],
      "max": 3, // Maximum rety 3 times
      "backoffBase": 1000, // Initial backoff duration in ms. Default: 100,
      "backoffExponent": 1.5, // Exponent to increase backoff each try. Default: 1.1
    }
  },
  "test": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": "mysql"
  }
};
