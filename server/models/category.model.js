const { DataTypes, Model } = require("sequelize");

module.exports = function (sequelize) {
  class Category extends Model {}

  Category.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      type: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "type",
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
      modelName: "Category",
      tableName: "Category",
    }
  );

  return Category;
};
