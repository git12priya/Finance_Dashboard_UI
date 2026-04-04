function RoleSwitcher({ role, setRole }) {
  const toggleRole = () => {
    setRole(role === "viewer" ? "admin" : "viewer");
  };

  return (
    <div
      className={`role-circle ${role === "admin" ? "admin" : "viewer"}`}
      onClick={toggleRole}
      title={role === "admin" ? "Admin Mode" : "Viewer Mode"}
    >
      {role === "admin" ? "🛠" : "👤"}
    </div>
  );
}

export default RoleSwitcher;