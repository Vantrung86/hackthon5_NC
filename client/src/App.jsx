import React from 'react'
import Login from "../src/components/login/Login"
import TodoList from './components/todo/TodoList'
import { Route, Routes } from 'react-router-dom'


export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/todo" element={<TodoList/>}></Route>
      </Routes>
        
    </>
  )
}
