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
        // references: {
        //   model: "Expense",
        //   key: "id",
        // },
        field: "expenseId",
      },

      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // references: {
        //   model: "Category",
        //   key: "id",
        // },
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
