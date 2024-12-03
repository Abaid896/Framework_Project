const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const jwt = require('jsonwebtoken');
const models = require('../models/user'); 

// require('dotenv').config();

/**
 * Extracts token from: header, body or query
 * @param {Object} req - request object
 * @returns {string} token - decrypted token
 */
const jwtExtractor = req => {
console.log("req.headers.authorization--- "+req.headers.authorization);

  let token = null
  if (req.headers.authorization) {
    token = req.headers.authorization.replace('Bearer', '').trim()
  } else if (req.body.token) {
    token = req.body.token.trim()
  } else if (req.query.token) {
    token = req.query.token.trim()
  }else if(req.header('x-auth-token')){
    token = req.header('x-auth-token')
  }else if(req.header('x-access-token')){
    token = req.header('x-access-token')
  }
  
  // if (token) {
   
  //   // Decrypts token
  //   const decoded = jwt.verify(token,process.env.JWT_SECRET);
   
  // } 

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Make sure JWT_SECRET is correct
      console.log("Decoded JWT:", decoded);  // Log decoded token for debugging
    } catch (err) {
      console.error("JWT Verification Error:", err);  // Log any JWT verification errors
      return null;
    }
  }
  return token
}

/**
 * Options object for jwt middlware
 */


const jwtOptions = {
  jwtFromRequest: jwtExtractor,
  secretOrKey:  "MyUltraSecurePassWordIWontForgetToChange"
}

/**
 * Login with JWT middleware
 */
const jwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {
  try{
    const user = await models.findById(payload.User);

    return !user ? done(null, false) : done(null, user)

  }catch(err){
    return done(err, false)
  }
})
passport.use(jwtLogin)

