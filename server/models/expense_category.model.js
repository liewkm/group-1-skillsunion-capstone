const { DataTypes, Model } = require("sequelize");

module.exports = function (sequelize) {
  class ExpenseCategory extends Model {}

  ExpenseCategory.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      expenseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "expenseId",
      },

      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "categoryId",
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
      modelName: "ExpenseCategory",
      tableName: "ExpenseCategory",
    }
  );

  return ExpenseCategory;
};
