/* 
Visualize monthly expense 
Display which categories money been expensed using pie chart
*/

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function ExpensePieChart({transactions}) {
  const categoryMap = {};

  // Calculate total amount by searching same category
  transactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      if (!categoryMap[t.category]) {
        categoryMap[t.category] = 0;
      }
      categoryMap[t.category] += t.amount;
    });

  // Make them a new list that for a total value for each category
  const data = Object.keys(categoryMap).map((key) => ({
    name: key,
    value: categoryMap[key],
  }));

  const COLORS = [
    "#36248c",
    "#6abdde",
    "#093073",
    "#991b12",
    "#9d67f5",
    "#6d9ced",
  ];

  return (
    <div style={{
        background: "white",
        padding: "20px",
        borderRadius: "12px",
        marginBottom: "30px",
      }}>

      <h2 style={{color : "black"}}>Expense Breakdown</h2>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={120}
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip/>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ExpensePieChart;