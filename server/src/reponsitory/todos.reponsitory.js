const db = require("../config/db.config");

//lay todos
async function getAllTodo() {
  const [result] = await db.execute("SELECT * FROM todos");
  return result;
}
//them
async function addOneTodo(name) {
      const result = await db.execute(
        "INSERT INTO todos (nameTodo) VALUES (?)",
        [name]
      );
      return result;
  }
//xoa
async function deleteOneTodo(id) {
    const result = await db.execute("DELETE FROM todos WHERE id=?",[id]);
    return result;
} 
//update
async function updateOneTodo(id,name) {
    const result = await db.execute("UPDATE todos SET nameTodo=? WHERE id=?",[name,id]);
    return result
}

  module.exports = {
        getAllTodo,
        addOneTodo,
        deleteOneTodo,
        updateOneTodo
  }