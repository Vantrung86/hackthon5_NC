import React, { useState } from "react";
import "./login.css";
import publicAxios from "../../config/publicAxios";
import {useNavigate} from "react-router-dom"

export default function Login() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const handleChangeInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await publicAxios.post("/api/v1/login", user);
      alert(res.data.message);
      localStorage.setItem("token", res.data.token);
      navigate("/todo")
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <>
      <div className="container1">
        <h2>Đăng Nhập</h2>
        <form action="#" method="post">
          <div className="form-group1">
            <label>Email:</label>
            <input type="text" name="email" onChange={handleChangeInput} />
          </div>
          <div className="form-group1">
            <label>Mật Khẩu:</label>
            <input type="text" name="passwords" onChange={handleChangeInput} />
          </div>
          <div className="form-group1">
            <button type="submit" onClick={handleSubmit}>
              Đăng Nhập
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
