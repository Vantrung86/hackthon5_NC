const jwt = require("jsonwebtoken");
const { getAllTodo } = require("../reponsitory/todos.reponsitory");

const verifyToken = (req, res, next) => {
  try {
    // Lấy token
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Không tìm thấy token" });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          // Nếu token đã hết hạn
          return res.status(401).json({ message: "Token đã hết hạn" });
        } else {
          // Nếu token không hợp lệ
          return res.status(403).json({ message: "Token không hợp lệ" });
        }
      }
      if (decoded.role != 1) {
        return res.status(403).json({
          message: "Bạn không có quyền",
        });
      }
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
const validation = (req, res, next) => {
  const { nameTodo } = req.body;
  if (!nameTodo) {
    res.status(400).json({
      message: "Bạn chưa nhập công việc",
    });
  } else {
    next();
  }
};

const checkNameTodo = async (req, res, next) => {
  const { nameTodo } = req.body;
  const result = await getAllTodo();
  const obj = result.find(e => e.nameTodo == nameTodo)
  if (obj) {
    return res.status(401).json({
      message: "Đã có công việc",
    });
  }
  next();
};

const validationUser = (req, res, next) => {
  const { email,passwords } = req.body;
  if (!email || !passwords) {
    res.status(400).json({
      message: "Bạn chưa nhập email hoặc mật khẩu",
    });
  } else {
    next();
  }
};
module.exports = {
  verifyToken,
  validation,
  checkNameTodo,
  validationUser
};
