import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

// 🎨 colors
const COLORS = ["#0d6efd", "#198754", "#dc3545", "#ffc107"];

// 📈 Line data
function prepareLineData(transactions = []) {
  if (!Array.isArray(transactions)) return [];

  let balance = 0;

  return transactions.map((t) => {
    if (t.type === "income") balance += t.amount;
    else balance -= t.amount;

    return {
      date: new Date(t.date).toLocaleDateString(),
      balance,
    };
  });
}

// 🥧 Pie data
function preparePieData(transactions = []) {
  const map = {};

  transactions.forEach((t) => {
    if (t.type === "expense") {
      map[t.category] = (map[t.category] || 0) + t.amount;
    }
  });

  return Object.keys(map).map((key) => ({
    name: key,
    value: map[key],
  }));
}

// ✅ Balance Chart
export function BalanceChart({ transactions = [] }) {
  const data = prepareLineData(transactions);

  return (
    <div className="card p-3">
      <h5>Balance Trend</h5>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="balance" stroke="#0d6efd" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// ✅ Expense Chart
export function ExpenseChart({ transactions = [] }) {
  const data = preparePieData(transactions);

  return (
    <div className="card p-3">
      <h5>Spending Breakdown</h5>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" outerRadius={100}>
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}