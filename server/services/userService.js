// execute to DB model

const { User } = require("../models");
User.sync({ alter: true }).then(() => console.log("User Database is ready"));

module.exports = {
  // Check if user exist in USER table, else create user in USER table
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

    // console.log(
    //   `User details: ${JSON.stringify(user)} \nUser created new: ${created})`
    // );

    result.data = user;
    return result;
  },
};
