// Import sequelize
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

// init sequelize
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });


// Test connection function
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    return true;
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    return false;
  }
}



// Import model(s)
const User = require("./user.model")(sequelize);
const Expense = require("./expense.model")(sequelize);
const Category = require("./category.model")(sequelize);
const ExpenseCategory = require("./expense_category.model")(sequelize);



// Create associations
User.hasMany(Expense, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});
Expense.belongsTo(User, {
  onDelete: "CASCADE",
});

Expense.belongsToMany(Category, {
  through: "ExpenseCategory",
  foreignKey: "expenseId",
});
Category.belongsToMany(Expense, {
  through: "ExpenseCategory",
  foreignKey: "categoryId",
});

// Exports (enhanced object literal)
module.exports = {
  sequelize,
  testConnection,
  User,
  Expense,
  ExpenseCategory,
  Category,
};
