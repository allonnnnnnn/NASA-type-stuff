import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();

      fetch("http://localhost:5000/api/account",
        {
          body: JSON.stringify({ username: username }),
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `${token}`
          }
        }
      ).then((response) => {
        if (response.ok) {
            navigate("/home");
        }
      });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Create Your Explorer Account</h2>
      <form onSubmit={handleSignup} style={styles.form}>
        <input
          type="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Sign Up</button>
      </form>
      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    color: "white",
    background: "radial-gradient(circle at top, #0b0f2f, #000)",
  },
  form: { display: "flex", flexDirection: "column", gap: "1rem", width: "300px" },
  input: { padding: "0.75rem", borderRadius: "6px", border: "none" },
  button: { background: "#00ffff", color: "#000", padding: "0.75rem", borderRadius: "6px" },
  error: { color: "red" },
};

export default SignupPage;
