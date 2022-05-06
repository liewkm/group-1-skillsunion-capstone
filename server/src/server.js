const express = require("express");
const cors = require("cors");
const middleware = require("./middleware");

const app = express();
const port = 5050;

app.use(
  cors({
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(middleware.decodeToken);

app.get("/", (req, res) => {
  return res.send("Backend Page");
});

app.get("/api/expense", (req, res) => {
  console.log("==> req.user: ", req.user);
  console.log("==> req.userId: ", req.userId);
  console.log("==> req: ", req.email);

  return res.json({
    expense: [
      { user: req.user, userId: req.userId },
      { description: "Item 1", price: "$53.99" },
      { description: "Item 2", price: "$34.00" },
      { description: "Item 3", price: "$76.48" },
    ],
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
