import { signInWithPopup } from "firebase/auth";
import React from "react";
import { auth, googleProvider } from "../utils/firebase";
import api from "../utils/axios";


const App = () => {
  const handleLogin = async (token) => {
    try {
      const data = await api.post("/api/auth/login", {token});
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const googleLogin = async () => {
    const data = await signInWithPopup(auth, googleProvider);
    const token = await data.user.getIdToken()
    console.log(token)
    await handleLogin(token)
    console.log(data);
  };
  return (
    <div className="text-3xl font-bold underline" onClick={googleLogin}>
      App
    </div>
  );
};

export default App;
