import { useState, useEffect } from "react";
import DashboardCards from "../components/DashboardCards";
import TransactionsTable from "../components/TransactionsTable";
import RoleSwitcher from "../components/RoleSwitcher";
import Insights from "../components/Insights";
import { BalanceChart, ExpenseChart } from "../components/Charts";

function Dashboard({ role, setRole }) {
  const [transactions, setTransactions] = useState([
  {
    id: 1,
    date: "2026-04-01",
    amount: 50000,
    category: "Salary",
    type: "income",
  },
  {
    id: 2,
    date: "2026-04-02",
    amount: 1500,
    category: "Food",
    type: "expense",
  },
  {
    id: 3,
    date: "2026-04-03",
    amount: 2000,
    category: "Transport",
    type: "expense",
  },
  {
    id: 4,
    date: "2026-04-04",
    amount: 8000,
    category: "Freelance",
    type: "income",
  },
  {
    id: 5,
    date: "2026-04-05",
    amount: 3000,
    category: "Shopping",
    type: "expense",
  },
  {
    id: 6,
    date: "2026-04-06",
    amount: 1200,
    category: "Bills",
    type: "expense",
  },
  {
    id: 7,
    date: "2026-04-07",
    amount: 2500,
    category: "Entertainment",
    type: "expense",
  },
  {
    id: 8,
    date: "2026-04-08",
    amount: 10000,
    category: "Bonus",
    type: "income",
  },
]);

  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    amount: "",
    category: "",
    type: "expense",
    date: "",
  });

  // 🔥 Hide form when switching role
  useEffect(() => {
    if (role !== "admin") {
      setShowForm(false);
      setEditId(null);
    }
  }, [role]);

  // ✅ Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Add / Update
  const handleAdd = () => {
    if (!form.amount || !form.category || !form.date) return;

    if (editId) {
      // ✏️ UPDATE
      const updated = transactions.map((t) =>
        t.id === editId
          ? { ...t, ...form, amount: Number(form.amount) }
          : t
      );
      setTransactions(updated);
      setEditId(null);
    } else {
      // ➕ ADD
      const newTransaction = {
        id: Date.now(),
        amount: Number(form.amount),
        category: form.category,
        type: form.type,
        date: form.date,
      };
      setTransactions((prev) => [...prev, newTransaction]);
    }

    // reset form
    setForm({
      amount: "",
      category: "",
      type: "expense",
      date: "",
    });

    setShowForm(false);
  };

  // ❌ Delete
  const handleDelete = (id) => {
    setTransactions((prev) =>
      prev.filter((t) => t.id !== id)
    );
  };

  // ✏️ Edit
  const handleEdit = (t) => {
    setForm({
      amount: t.amount,
      category: t.category,
      type: t.type,
      date: t.date,
    });

    setEditId(t.id);
    setShowForm(true);
  };

  return (
    <div className="container mt-4">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>💰 Finance Dashboard</h2>

        <div style={{ width: "70px" }}>
          <RoleSwitcher role={role} setRole={setRole} />
        </div>
      </div>

      {/* Cards */}
      <DashboardCards transactions={transactions} />

      {/* Charts */}
      <div className="row mt-4">
        <div className="col-md-6">
          <BalanceChart transactions={transactions} />
        </div>

        <div className="col-md-6">
          <ExpenseChart transactions={transactions} />
        </div>
      </div>

      {/* Table */}
      <div className="mt-4">
        <TransactionsTable
          role={role}
          transactions={transactions}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </div>

      {/* Insights */}
      <Insights transactions={transactions} />

      {/* Add Button */}
      {role === "admin" && (
        <div className="mt-4">
          <button
            className="btn btn-primary"
            onClick={() => {
              setShowForm(!showForm);
              setEditId(null);
            }}
          >
            + Add Transaction
          </button>
        </div>
      )}

      {/* Form */}
      {role === "admin" && showForm && (
        <div className="card p-3 mt-3">
          <h5>{editId ? "Update Transaction" : "Add Transaction"}</h5>

          <input
            type="number"
            className="form-control mb-2"
            name="amount"
            placeholder="Amount"
            value={form.amount}
            onChange={handleChange}
          />

          <input
            className="form-control mb-2"
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
          />

          <input
            type="date"
            className="form-control mb-2"
            name="date"
            value={form.date}
            onChange={handleChange}
          />

          <select
            className="form-control mb-2"
            name="type"
            value={form.type}
            onChange={handleChange}
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>

          <button className="btn btn-success" onClick={handleAdd}>
            {editId ? "Update" : "Add"}
          </button>
        </div>
      )}
    </div>
  );
}

export default Dashboard;