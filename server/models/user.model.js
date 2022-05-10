const { DataTypes, Model } = require("sequelize");

module.exports = function (sequelize) {
  class User extends Model {}

  User.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "userName",
      },
      emailAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: "Must be a valid email address",
          },
        },
        field: "emailAddress",
      },
      createdAt: {
        type: DataTypes.DATE,
        field: "created_at",
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: "updated_at",
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "User",
    }
  );
  return User;
};
