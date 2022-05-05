// control logic and Return results from service.model

// import service
const userService = require("../services/userService");

// establish the Controller first, then userService
class UserController {
  async findOrCreateUser(req, res, next) {
    const uid = req.uid;
    const userName = req.userName;
    const emailAddress = req.emailAddress;

    if (uid && emailAddress) {
      // use the service layer
      const result = await userService.findOrCreateUser(
        uid,
        userName,
        emailAddress
      );

      console.log("register controller result: ", result);

      next();
      // return res.json({
      //   status: result.status,
      //   message: result.message,
      //   data: result.data,
      // });
    } else {
      res.status(400); // bad request
      return res.json({
        message: "Incorrect user inputs, non-existing uid/emailAddress",
      });
    }
  }
}

module.exports = UserController;
