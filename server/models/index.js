const { Sequelize } = require("sequelize");

// const sequelize = new Sequelize("sqlite::memory:");
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

const User = require("./user.model")(sequelize);
const Expense = require("./expense.model")(sequelize);
const Category = require("./category.model")(sequelize);
const ExpenseCategory = require("./expense_category.model")(sequelize);

// Create/Sync models in the DB
User.sync({ alter: true }).then(() => console.log("User Database is ready"));
Expense.sync({ alter: true }).then(() =>
  console.log("Expense Database is ready")
);
ExpenseCategory.sync({ alter: true }).then(() =>
  console.log("ExpenseCategory Database is ready")
);
Category.sync({ alter: true }).then(() => {
  console.log("Category Database is ready");
});

// Create table associations
User.hasMany(Expense, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});
Expense.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});
Expense.belongsToMany(Category, {
  through: ExpenseCategory,
  foreignKey: "expenseId",
});
Category.belongsToMany(Expense, {
  through: ExpenseCategory,
  foreignKey: "categoryId",
});

module.exports = {
  sequelize,
  User,
  Expense,
  ExpenseCategory,
  Category,
};