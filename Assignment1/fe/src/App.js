import React, { useState } from "react";
import CryptoJS from "crypto-js";

function App() {
  // State for form inputs and errors
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // For loading state

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (username.trim() === "" || password.trim() === "") {
      setError("Username and password are required");
      return;
    }

    setError("");
    setLoading(true); // Start loading state
    // alert(username + ":" + password);

    try {
      const hashedPassword = CryptoJS.SHA256(password).toString(
        CryptoJS.enc.Hex
      );
      console.log("Hashed Password:", hashedPassword);
      let reqData = JSON.stringify({
        username: username,
        password: hashedPassword,
      });

      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: reqData,
      });

      const data = await response.json();
      setLoading(false); // Stop loading

      if (response.ok) {
        console.log("Login successful:", data);
        setError("successful login");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (error) {
      setLoading(false); // Stop loading
      setError("Failed to connect to server", error);
      console.error("Error:", error);
    }
  };

  return (
    <div className="login-container">
      <h2>{error !== "successful login" ? "Login" : "Home"}</h2>
      {error && <p className="error">{error}</p>}
      {loading && <p>Loading...</p>}
      {error !== "successful login" && (
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
      )}
    </div>
  );
}

export default App;
