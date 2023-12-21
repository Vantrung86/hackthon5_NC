import React, { useEffect, useState } from 'react'
import privateAxios from "../../config/privateAxios";
import "./style.css"
import publicAxios from '../../config/publicAxios';
export default function TodoList() {
  const [todo,setTodo] = useState({});
  const [listTodo,setListTodo] = useState([]);
  const [flag,setFlag] = useState(false);
  const [check,setCheck] = useState(false);

  //Lấy todos
  const handleGetTodo= async () => {
      try {
        let res = await publicAxios.get("/api/v1/todo")
        setListTodo(res.data);
      } catch (error) {
        console.log(error);
      }
  };
  useEffect(()=>{
    handleGetTodo()
  },[flag])

  //Thêm todo
  const handleAddTodo = async () => {
    try {
        let res = await privateAxios.post("/api/v1/todo",todo);
        alert(res.data.message);
        setFlag(!flag)
    } catch (error) {
        alert(error.response.data.message);
    }
    setTodo({nameTodo:""})
  }
  //Xoá
  const handleDelete = async (id) => {
    try {
        let res = await privateAxios.delete(`/api/v1/todo/${id}`);
        alert(res.data.message);
        setFlag(!flag)
    } catch (error) {
        alert(error.response.data.message);
    }
  }
  //Edit
  const handleEdit = (item) => {
    setTodo(item);
    setCheck(true);
  };
  //Update
  const handleUpdateTodo = async () => {
      try {
          let res = await privateAxios.put(`/api/v1/todo/${todo.id}`,todo)
          alert(res.data.message);
          setFlag(!flag)
      } catch (error) {
          alert(error.response.data.message);
      }
      setCheck(false);
      setTodo({nameTodo:""});
  }

  return (
    <div className='container'>
    <h1>Todo App</h1>
    <div className='form-group'>
      <input type="text" placeholder='Add your new todo' value={todo.nameTodo} onChange={(e)=>setTodo({...todo,nameTodo:e.target.value})}/>
      {check 
      ? (<button onClick={handleUpdateTodo}>Update</button>) 
      : (<button onClick={handleAddTodo}>Add</button>)
      }
    </div>
    <ul>
        {listTodo.map((item)=>(
            <li key={item.id}>
                  <p>{item.nameTodo}</p>      
                  <i className="fa-solid fa-pen-to-square" onClick={()=>handleEdit(item)}></i>                   
                  <i className="fa-solid fa-trash" onClick={()=>handleDelete(item.id)}></i>
            </li>
        ))}   
    </ul>
</div>
  )
}
