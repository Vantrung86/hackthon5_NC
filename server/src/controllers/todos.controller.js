const { addOneTodo, getAllTodo, deleteOneTodo, updateOneTodo } = require("../reponsitory/todos.reponsitory");

//Lay todo
async function getTodo(req,res) {
    const result = await getAllTodo();
    res.status(200).json(result);
}
//them
async function addTodo(req,res) {
    const {nameTodo} = req.body;
    await addOneTodo(nameTodo);
    res.status(201).json({
        message: "Thêm thành công",
      });
}
//xoa
async function deleteTodo(req,res) {
    const {id} = req.params;
    await deleteOneTodo(id);
    res.status(200).json({
        message: "Xoá thành công",
      });
}
//update
async function updateTodo(req,res) {
    const {id} = req.params;
    const {nameTodo} = req.body;
    await updateOneTodo(id,nameTodo);
    res.status(200).json({
        message: "Cập nhật thành công",
      });
}

module.exports = {
    getTodo,
    addTodo,
    deleteTodo,
    updateTodo
}