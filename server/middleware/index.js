const admin = require("../config/firebase-config");

/* Middleware: decode front-end header token to extract 
username, uid and email and define them in req for controller module
*/
class Middleware {
  async decodeToken(req, res, next) {
    const token = req.headers.authorization.split(" ")[1];
    try {
      const decodeValue = await admin.auth().verifyIdToken(token);
      if (decodeValue) {
        req.user = decodeValue.name ?? decodeValue.email;
        req.uid = decodeValue.uid;
        req.email = decodeValue.email;
        return next();
      }
      return res.status(500).json({ message: "Unauthorise" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new Middleware();
