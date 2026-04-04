function Insights({ transactions = [] }) {
  const categories = {};

  transactions.forEach((t) => {
    if (t.type === "expense") {
      categories[t.category] =
        (categories[t.category] || 0) + t.amount;
    }
  });

  const keys = Object.keys(categories);

  const highest =
    keys.length > 0
      ? keys.reduce((a, b) =>
          categories[a] > categories[b] ? a : b
        )
      : "N/A";

  return (
    <div className="card p-3 mt-4">
      <h5>Insights</h5>
      <p>
        Highest spending category: <b>{highest}</b>
      </p>
    </div>
  );
}

export default Insights;