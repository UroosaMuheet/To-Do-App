import { useState } from "react";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = ()=>
  {
    navigate("/register");
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(`Username: ${username} Password: ${password}`);
    try{
    const res = await login(username, password);
    console.log(JSON.stringify(res));
    localStorage.setItem("token", res.data.token);
    navigate("/");
  }
    catch(e)
    {
      console.error(e);
      alert("Invalid Username or Password. Please try again.");
    }

  };

  return (
    <>
    <form onSubmit={handleLogin} className="flex flex-col gap-2 max-w-sm mx-auto">
      <label>Username: </label>
      <input
        className="login"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      /><br/><br/>

      <label>Password: </label>
      <input
        className="border rounded p-2"
        type="password"
        id="pwd"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br/>
      <span>
      <input type="checkbox" onClick={()=> {
        
        var x = document.getElementById("pwd");
        if(x.type == "password")
          x.type = "text";
        else
          x.type="password";
        }}/>Show Password
        </span>
        <br/><br/>
      <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2">Login</button>
      
    </form>
    <div>
        <p>New user?</p>
        <button onClick={handleRegister}>Register</button>
    </div>
    </>
  );
}
