// control logic and Return results from service.model

// import service
const userService = require("../services/userService");

// establish the Controller first, then userService
class UserController {
  async findOrCreateUser(req, res, next) {
    const uid = req.uid;
    const userName = req.user;
    const emailAddress = req.email;

    if (uid && emailAddress) {
      const result = await userService.findOrCreateUser(
        uid,
        userName,
        emailAddress
      );

      next();
      // return res.json({
      //   status: result.status,
      //   message: result.message,
      //   data: result.data,
      // });
    } else {
      res.status(400); 
      return res.json({
        message: "Incorrect user inputs, non-existing uid/emailAddress",
      });
    }

    
  }
}

module.exports = UserController;
