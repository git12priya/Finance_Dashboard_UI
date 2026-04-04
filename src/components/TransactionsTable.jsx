import { useState } from "react";

function TransactionsTable({ transactions = [], role, onDelete, onEdit }) {
  const [search, setSearch] = useState("");

  const filtered = transactions.filter((t) =>
    t.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h4>Transactions</h4>

      <input
        className="form-control mb-3"
        placeholder="Search category..."
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Type</th>
            {role === "admin" && <th>Action</th>}
          </tr>
        </thead>

        <tbody>
          {filtered.map((t) => (
            <tr key={t.id}>
              <td>{t.date}</td>
              <td>₹ {t.amount}</td>
              <td>{t.category}</td>
              <td>{t.type}</td>

              {role === "admin" && (
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => onEdit(t)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => {
                      if (window.confirm("Delete this transaction?")) {
                        onDelete(t.id);
                      }
                    }}
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionsTable;