/*----  
  Entry point to index.js

  routes -> controller -> service -> model (ORM) -> Database

----*/

const app = require("./routes");
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server has started on port ${port}`);
});
