const admin = require("../config/firebase-config");

class Middleware {
  async decodeToken(req, res, next) {
    const token = req.headers.authorization.split(" ")[1];

    try {
      const decodeValue = await admin.auth().verifyIdToken(token);
    //   console.log("==> decodeValue: ", decodeValue);
    //   console.log("==> uID: ", decodeValue.uid);

      if (decodeValue) {
        req.user = decodeValue.name;
        req.userId = decodeValue.uid;
        req.userEmail = decodeValue.email;
        return next();
      }

      return res.json({ message: "Unauthorise" });
    } catch (error) {
      console.log("Middleware error: ", error);
      return res.json({ message: "Internal Error" });
    }
  }
}

module.exports = new Middleware();
