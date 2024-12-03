const mongoose = require('mongoose')
const DB_URL = process.env.ATLAS_URI
const loadModels = require('../models/user.model')

module.exports = () => {
  const connect = () => {
    mongoose.Promise = global.Promise

    const uri = process.env.ATLAS_URI;

    // mongoose.connect(uri, { useNewUrlParser: true});

    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const connection = mongoose.connection;
    
    connection.once('open', () => {
      console.log("MongoDB database connection established successfully.");
    });

    
    mongoose.authenticate().then(function (err) {
          console.log('****************************')
          console.log('*    Starting Server')
          console.log(`*    Port: ${process.env.PORT || 4000}`)
          console.log(`*    Database: MongoDB`)
    })
    // mongoose.connect(
    //   DB_URL,
    //   {
    //     keepAlive: true,
    //     reconnectTries: Number.MAX_VALUE,
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true
    //   },
    //   err => {
    //     let dbStatus = ''
    //     if (err) {
    //       dbStatus = `*    Error connecting to DB: ${err}\n****************************\n`
    //     }
    //     dbStatus = `*    DB Connection: OK\n****************************\n`
    //     if (process.env.NODE_ENV !== 'test') {
    //       // Prints initialization
    //       console.log('****************************')
    //       console.log('*    Starting Server')
    //       console.log(`*    Port: ${process.env.PORT || 3000}`)
    //       console.log(`*    NODE_ENV: ${process.env.NODE_ENV}`)
    //       console.log(`*    Database: MongoDB`)
    //       console.log(dbStatus)
    //     }
    //   }
    // )
    // mongoose.set('useCreateIndex', true)
    // mongoose.set('useFindAndModify', false)
  }
  // connect()

  // mongoose.connection.on('error', console.log)
  // mongoose.connection.on('disconnected', connect)

  loadModels()
}
