import { useState, useEffect } from "react";
import Dashboard from "./pages/Dashboard";

function App() {
  const [role, setRole] = useState("viewer");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      setDarkMode(true);
      document.body.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setDarkMode(!darkMode);
  };

  return (
    <div>
      {/* 🔘 Circular Toggle */}
      <div
        style={{
          position: "fixed",
          top: 20,
          right: 20,
        }}
      >
        <div className="theme-toggle" onClick={toggleTheme}></div>
      </div>

      <Dashboard role={role} setRole={setRole} />
    </div>
  );
}

export default App;