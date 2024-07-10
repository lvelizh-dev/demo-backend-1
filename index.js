const express = require("express");
// const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");

const connection = require("./connection");

const category = require("./controllers/category.controller");
const product = require("./controllers/product.controller");
const customer = require("./controllers/customer.controller");
const order = require("./controllers/order.controller");


//Settings
app.set("port", process.env.PORT || 3001);

//Middlewares
app.use(cors());
//app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(cors({origin: 'http://localhost:4200'}));
//Routes
// app.use("/api/config", require("./routes/config.routes"));
// app.use("/api/bonos", require("./routes/bono.routes"));
// app.use("/api/users", require("./routes/user.routes"));
// app.use("/api/inflations", require("./routes/inflation.routes"));
// app.use("/api/gracePeriods", require("./routes/gracePeriod.routes"));
//connection();

app.get('/', (req, res) => {
    res.send('Hello World, from express');
});

app.get("/api/customers/:id", customer.getCustomerById);
app.post("/api/customers", customer.createCustomer);
app.put("/api/customers/:id", customer.updateCustomer);
app.delete("/api/customers/:id", customer.deleteCustomer);

app.get("/api/categories/:id", category.getCategoryById);
app.post("/api/categories", category.createCategory);
app.put("/api/categories/:id", category.updateCategory);
app.delete("/api/categories/:id", category.deleteCategory);

app.get("/api/products/:id", product.getProductById);
app.post("/api/products", product.createProduct);
app.put("/api/products/:id", product.updateProduct);
app.delete("/api/products/:id", product.deleteProduct);

app.get("/api/orders/:id", order.getOrderById);
app.post("/api/orders", order.createOrder);
app.put("/api/orders/:id", order.updateOrder);
app.delete("/api/orders/:id", order.deleteOrder);


app.listen(app.get("port"), () => {
  console.log('"Server on port', app.get("port"));
});
