/* A financial insight for business to track*/

function FinancialInsights({transactions}) {

  // Calculate the total income from all income transactions
  const income = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  // Calculate the total expense from all expense transactions
  const expense = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  // Savings Rate = (Income - Expense) / Income × 100
  // Avoid division by zero when there is no income.
  const savingsRate = income
    ? ((income - expense) / income * 100).toFixed(1)
    : 0;

  // Store the total expense amount for each category.
  const categoryTotals = {};

  transactions
    .filter(t => t.type === "expense")
    .forEach(t => {
      // Initialize the category if it doesn't exist
      if (!categoryTotals[t.category]) {
        categoryTotals[t.category] = 0;
      }
      // Accumulate expense amount by category
      categoryTotals[t.category] += t.amount;
    });

  // Find the category with the highest expense
  const topCategory = Object.keys(categoryTotals).reduce(
    (a, b) =>
      categoryTotals[a] > categoryTotals[b] ? a : b,
    "None"
  );

  // Get the amount of the highest spending category, make it to 0 if there are no expense transactions
  const topAmount = categoryTotals[topCategory] || 0;

  return (
    <div className="insights">
      <h2>📈 Financial Insights</h2>
      <p>
        Savings Rate:
        <strong> {savingsRate}%</strong>
      </p>
      <p>
        Highest Spending:
        <strong>
          {" "}
          {topCategory} (${topAmount})
        </strong>
      </p>
      <p>
        Total Income: 
        <strong> ${income}</strong>
      </p>
      <p>
        Total Expense: 
        <strong> ${expense}</strong>
      </p>
    </div>
  );
}

export default FinancialInsights;