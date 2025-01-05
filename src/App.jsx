import { useState } from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import axios from "axios";
// import './App.css'

const path = import.meta.env.VITE_API_PATH;
const BASE = import.meta.env.VITE_BASE_URL;

//註冊請求
async function signUp(e,account) {
  e.preventDefault();
  try {
    // console.log(`${BASE}${path}`);
    const res = await axios.post(`${BASE}${path}`, account);
    // console.log(res.data.expired);
    document.cookie = `hexToken=${res.data.token}; expires=${res.data.expired}`;
    console.log(document.cookie);
  } catch (error) {
    console.log(error.response.data);
  }
}
// signUp();

function App() {
  const [account, setAccount] = useState({
    username: "",
    password: "",
  });
  //處理表單
  const handleInputValue = (e) => {
    const { name, value } = e.target;
    setAccount(account => ({
      ...account,
      [name]: value,
    }));
    console.log(account);
  };
  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <h1 className="mb-5">請先登入</h1>
        <form className="d-flex flex-column gap-3">
          <div className="form-floating mb-3">
            <input
              type="email"  
              className="form-control"
              id="username"
              name="username"
              placeholder="name@example.com"
              onChange={handleInputValue}
            />
            <label htmlFor="username">Email address</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              name="password"
              onChange={handleInputValue}
            />
            <label htmlFor="password">Password</label>
          </div>
          <button className="btn btn-primary" type="button" onClick={(e)=>signUp(e,account)}>登入</button>
        </form>
        <p className="mt-5 mb-3 text-muted">&copy; 2024~∞ - 六角學院</p>
      </div>
    </>
  );
}

export default App;
