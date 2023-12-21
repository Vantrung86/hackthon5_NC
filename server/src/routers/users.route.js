const { login } = require("../controllers/users.controller")
const { validationUser } = require("../middlewares/middleware")



const userRouter = (app) => {
    app.post("/api/v1/login",validationUser,login)
}

module.exports = {
    userRouter
}