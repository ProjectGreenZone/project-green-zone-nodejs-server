function authMiddleware(req, res, next) {
    const req_token = req.get('id_token');
    if(req_token) {
      //res.json({session_timeout:true});
      //uncoment above statement and remove belove statement
      next()
    } else {
      //put token ids at logins and check if they exist here or response session_timeout
      next();
    }
  }
module.exports = authMiddleware;