const { User } = require("../models");

/* User service module that check if user exist in the table, else create 
  user {id, userName, emailAddress}, require header decodeToken uid as id. 
  userName can be null */
module.exports = {
  findOrCreateUser: async (uid, userName, emailAddress) => {
    let result = {
      message: null,
      status: null,
      data: null,
    };

    const [user, created] = await User.findOrCreate({
      where: { id: uid, userName: userName, emailAddress: emailAddress },
    });

    if (created) {
      user.save();
      result.status = 201;
      result.message = `User ${user.id} CREATED in USER table`;
    } else {
      result.status = 200;
      result.message = `User ${user.id} FOUND in USER table`;
    }

    result.data = user;
    return result;
  },
};
