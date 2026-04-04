function DashboardCards({ transactions = [] }) {
  const income = transactions
    .filter(t => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const expense = transactions
    .filter(t => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  const balance = income - expense;

  return (
    <div className="row mb-4">
      <div className="col-md-4">
        <div className="card p-3">
          <h5>Total Balance</h5>
          <h3 style={{ color: "#2563eb" }}>₹ {balance}</h3>
        </div>
      </div>

      <div className="col-md-4">
        <div className="card p-3">
          <h5>Income</h5>
          <h3 style={{ color: "#16a34a" }}>₹ {income}</h3>
        </div>
      </div>

      <div className="col-md-4">
        <div className="card p-3">
          <h5>Expenses</h5>
          <h3 style={{ color: "#dc2626" }}>₹ {expense}</h3>
        </div>
      </div>
    </div>
  );
}

export default DashboardCards;