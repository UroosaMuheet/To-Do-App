import { useState } from "react";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const { register } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleLogin = ()=>
  {
    navigate("/login");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if(password == confirmPwd)
    {
      try{
        await register(username, email,password);
        alert("User registered! Please login.");
        navigate("/login");
      }
      catch(e)
      {
        console.log(JSON.stringify(e));
        alert("Username or email already exists! Please try a different one.");
      }
      
    }
    else
      alert("Passwords do not match!");
    
  };

  return (
    <>
    <form onSubmit={handleRegister} className="flex flex-col gap-2 max-w-sm mx-auto">
      <label>Username: </label>
      <input
        className="border rounded p-2"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      /><br/><br/>

      <label>Email: </label>
      <input
        className="border rounded p-2"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /><br/><br/>

      <label>Password: </label>
      <input
        className="border rounded p-2"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br/><br/>

      <label>Re-enter Password: </label>
      <input
        className="border rounded p-2"
        type="password"
        placeholder="Password"
        value={confirmPwd}
        onChange={(e) => setConfirmPwd(e.target.value)}
      /><br/><br/>
      <button className="bg-green-500 text-white rounded px-4 py-2">Register</button>
    </form>
    <div>
    <p>Existing user?</p>
      <button onClick={handleLogin}>Sign In</button>
    </div>
    </>
  );
}
