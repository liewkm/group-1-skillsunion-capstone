const admin = require("firebase-admin");

// need to get your own service acctKey and save it in the same folder
const serviceAccount = require("./serviceAccKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
