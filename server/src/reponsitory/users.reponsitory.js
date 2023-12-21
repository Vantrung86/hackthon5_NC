const db = require("../config/db.config");

async function getUserByEmail(email) {
    try {
      const [result] = await db.execute("select * from users where email = ?", [
        email,
      ]);
      return result[0];
    } catch (error) {
      console.log(error);
    }
  }

  module.exports = {
    getUserByEmail,
  }