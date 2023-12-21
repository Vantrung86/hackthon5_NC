const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const { userRouter } = require("./src/routers/users.route");
const { todosRouter } = require("./src/routers/todos.router");
require("dotenv").config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

userRouter(app);
todosRouter(app);

app.listen(process.env.PORT,()=>{
    console.log(`Đã chạy vào cổng ${process.env.PORT}`);
})