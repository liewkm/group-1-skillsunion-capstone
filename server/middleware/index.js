const admin = require("../config/firebase-config");

class Middleware {
  async decodeToken(req, res, next) {
    const token = req.headers.authorization.split(" ")[1];

    try {
      const decodeValue = await admin.auth().verifyIdToken(token);
    //   console.log("==> decodeValue: ", decodeValue);
    //   console.log("==> uID: ", decodeValue.uid);

      if (decodeValue) {
        req.userName = decodeValue.name;
        req.uid = decodeValue.uid;
        return next();
      }

      return res.status(500).json({ message: "Unauthorise" });
    } catch (error) {
      console.log("Middleware error: ", error);
      return res.status(500).json({ message: "Internal Error" });
    }
  }
}

module.exports = new Middleware();
