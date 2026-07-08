/* Monthly income statement */

function MonthlyReport({transactions}) {

  // Cal the total income for this month
  const income = transactions
    .filter((tx) => tx.type === "income")
    .reduce((sum, tx) => sum + tx.amount, 0);

  // Cal the total expense for this month
  const expenses = transactions
    .filter((tx) => tx.type === "expense")
    .reduce((sum, tx) => sum + tx.amount, 0);

  // Cal the net income for this month
  const netIncome = income - expenses;
  
  // Display the expenses filtered by its category to monitor expense even for budgeting 
  const expenseByCategory = {};

  transactions
    .filter((tx) => tx.type === "expense")
    .forEach((tx) => {
      if (!expenseByCategory[tx.category]) {
        expenseByCategory[tx.category] = 0;
      }
      expenseByCategory[tx.category] += tx.amount;
    });

  return (
    <div className="report">
      <h2>Monthly Report</h2>
      <div>
        <p>Revenue:<strong> ${income}</strong></p>
        <p>Expenses:<strong> ${expenses}</strong></p>
        <p>Net Income:<strong> ${netIncome}</strong></p>
      </div>
      <h3>Expense Breakdown</h3>
      {
        Object.keys(expenseByCategory)
          .map((category) => (
            <p key={category}>
              {category}: ${expenseByCategory[category]}
            </p>
          ))
      }
    </div>
  );
}

export default MonthlyReport;

/*我现在的monthly report并没有按月份cal，需要后期做一个month filter*/