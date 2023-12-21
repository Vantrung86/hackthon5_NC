const { getUserByEmail } = require("../reponsitory/users.reponsitory");
const jwt = require("jsonwebtoken")

async function login(req, res) {  
    try {
      const { email, passwords } = req.body;
      const user = await getUserByEmail(email);
      if (!user) {
        return res.status(404).json({
          message: "không tìm thấy user",
        });
      }
      if (user.passwords !== passwords) {
        return res.status(400).json({
          message: "Sai mật khẩu",
        });
      }
      const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: "20m",
      });
      
      res.status(200).json({
        message: "Đăng nhập thành công",
        token
      });
    } catch (error) {
      console.log(error);
    }
  }
  
  module.exports = {
    login,
  }