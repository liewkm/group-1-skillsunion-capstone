const { DataTypes, Model } = require("sequelize");

module.exports = function (sequelize) {
  class Expense extends Model {}

  Expense.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      userId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: "userId",
      },

      expenseDate: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "expenseDate",
      },

      expenseAmount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "expenseAmount",
      },

      description: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "description",
      },

      UPC_input: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "NULL",
        field: "UPC_input",
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
      modelName: "Expense",
      tableName: "Expense",
    }
  );

  return Expense;
};
