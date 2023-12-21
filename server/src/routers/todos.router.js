const { addTodo, getTodo, deleteTodo, updateTodo } = require("../controllers/todos.controller")
const { verifyToken, validation, checkNameTodo } = require("../middlewares/middleware")


const todosRouter = (app) => {
    app.get("/api/v1/todo",getTodo)
    app.post("/api/v1/todo",verifyToken,validation,checkNameTodo, addTodo)
    app.delete("/api/v1/todo/:id",verifyToken, deleteTodo)
    app.put("/api/v1/todo/:id",verifyToken,validation, updateTodo)
}

module.exports = {todosRouter}