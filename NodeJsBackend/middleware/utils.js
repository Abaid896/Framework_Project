exports.buildErrObject = (code, message) => {
    return {
      code,
      message
    }
  }
  
  
  exports.handleError = (res, err) => {
    // Prints error in console
    if (process.env.NODE_ENV === 'development') {
      console.log(err)
    }
    // Sends error to user
    res.status(err.code).json({
      errors: {
        msg: err.message
      },
      code:err.code
    })
  }


exports.itemNotFound = (err, item, reject, message) => {
  if (err) {
      return reject(this.buildErrObject(422, err.message));  
  }
  if (!item) {
      return reject(this.buildErrObject(404, message)); 
  }
}
