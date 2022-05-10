const userService = require("../services/userService");

// Control input logic, UserController --> userService --> next()
class UserController {
  async findOrCreateUser(req, res, next) {
    const uid = req.uid;
    const userName = req.user;
    const emailAddress = req.email;

    try {
      if (uid && emailAddress) {
        const result = await userService.findOrCreateUser(
          uid,
          userName,
          emailAddress
        );
        next();
      } else {
        res.status(400);
        return res.json({
          message: "Incorrect user inputs, non-existing uid/emailAddress",
        });
      }
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        const messages = Object.values(error.errors).map((val) => val.message);
        return res.status(400).json({ sucess: false, error: messages });
      } else {
        return res.status(500).json({ sucess: false, error: error });
      }
    }
  }
}

module.exports = UserController;
