/* 
Visualize monthly cash flow 
Display monthly income and expense trends using line chart
*/

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Chart({transactions}) {
  // Store monthly income and expense totals.
  // Key format: "YYYY-MM"
  const monthlyData = {};

  // Group all transactions by month
  // Extract the year and month from the transaction date.
  // Example:
  // "2026-07-08" -> "2026-07"
  transactions.forEach((tx) => {
    const month = tx.date
      ? tx.date.slice(0, 7)
      : "2026-07";

    // Initialize the month if it doesn't exist yet.
    if (!monthlyData[month]) {
      monthlyData[month] = {
        month,
        income: 0,
        expense: 0,
      };
    }

    // Add the transaction amount to either income or expense for that month.
    if (tx.type === "income") {
      monthlyData[month].income += tx.amount;
    } else {
      monthlyData[month].expense += tx.amount;
    }
  });

  // Convert the object into an array, so Recharts can render it.
  const data = Object.values(monthlyData);

  return (
    <div
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "12px",
        marginBottom: "30px",
      }}
    >
      <h2 style={{color : "black"}}>Monthly Cash Flow</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="month"/>
          <YAxis/>
          <Tooltip/>
          <Line
            type="monotone"
            dataKey="income"
            stroke="#16a34a"
            strokeWidth={3}
          />

          <Line
            type="monotone"
            dataKey="expense"
            stroke="#dc2626"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Chart;